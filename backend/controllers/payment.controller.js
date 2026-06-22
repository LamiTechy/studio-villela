import { supabase } from "../lib/supabase.js";
import { stripe } from "../lib/stripe.js";

const buildLineItems = (products, coupon) =>
	products.map((product) => {
		const discountFactor = coupon ? 1 - coupon.discount_percentage / 100 : 1;
		const unitAmount = Math.max(0, Math.round(product.price * 100 * discountFactor));

		return {
			price_data: {
				currency: "usd",
				product_data: {
					name: product.name,
					images: [product.image],
				},
				unit_amount: unitAmount,
			},
			quantity: product.quantity || 1,
		};
	});

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let coupon = null;
		if (couponCode) {
			const { data, error } = await supabase
				.from("coupons")
				.select("*")
				.eq("code", couponCode)
				.eq("user_id", req.user.id)
				.eq("is_active", true)
				.single();

			if (!error && data) {
				coupon = data;
			}
		}

		const lineItems = buildLineItems(products, coupon);
		const totalAmount = lineItems.reduce(
			(sum, item) => sum + item.price_data.unit_amount * item.quantity,
			0
		);

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			metadata: {
				userId: req.user.id,
				couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		if (totalAmount >= 20000) {
			await createNewCoupon(req.user.id);
		}

		res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status !== "paid") {
			return res.status(400).json({ message: "Payment not completed" });
		}

		if (session.metadata.userId !== req.user.id) {
			return res.status(403).json({ message: "Unauthorized checkout success request" });
		}

		const couponCode = session.metadata.couponCode;
		if (couponCode) {
			await supabase
				.from("coupons")
				.update({ is_active: false })
				.eq("code", couponCode)
				.eq("user_id", req.user.id);
		}

		const products = JSON.parse(session.metadata.products);
		const { data: order, error: orderError } = await supabase.from("orders").insert([
			{
				user_id: req.user.id,
				products: products.map((product) => ({
					product_id: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				total_amount: session.amount_total / 100,
				stripe_session_id: sessionId,
			},
		]);

		if (orderError) {
			throw orderError;
		}

		res.status(200).json({
			success: true,
			message: "Payment successful, order created, and coupon deactivated if used.",
			orderId: order[0].id,
		});
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};

async function createNewCoupon(userId) {
	const { data: existingCoupon, error: existingError } = await supabase
		.from("coupons")
		.select("id")
		.eq("user_id", userId)
		.maybeSingle();

	if (existingError && existingError.code !== "PGRST116") {
		throw existingError;
	}

	if (existingCoupon) {
		await supabase.from("coupons").delete().eq("id", existingCoupon.id);
	}

	const { data: newCoupon, error } = await supabase.from("coupons").insert([
		{
			code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
			discount_percentage: 10,
			expiration_date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
			user_id: userId,
			is_active: true,
		},
	]);

	if (error) {
		throw error;
	}

	return newCoupon[0];
}
