import { supabase } from "../lib/supabase.js";

const normalizeCoupon = (coupon) => {
	if (!coupon) return null;
	return {
		id: coupon.id,
		code: coupon.code,
		discountPercentage: coupon.discount_percentage,
		expirationDate: coupon.expiration_date,
		isActive: coupon.is_active,
		userId: coupon.user_id,
	};
};

export const getCoupon = async (req, res) => {
	try {
		const { data, error } = await supabase
			.from("coupons")
			.select("*")
			.eq("user_id", req.user.id)
			.eq("is_active", true)
			.single();

		if (error && error.code !== "PGRST116") {
			throw error;
		}

		res.json(normalizeCoupon(data));
	} catch (error) {
		console.log("Error in getCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const validateCoupon = async (req, res) => {
	try {
		const { code } = req.body;
		const { data: coupon, error } = await supabase
			.from("coupons")
			.select("*")
			.eq("code", code)
			.eq("user_id", req.user.id)
			.eq("is_active", true)
			.single();

		if (error || !coupon) {
			return res.status(404).json({ message: "Coupon not found" });
		}

		if (new Date(coupon.expiration_date) < new Date()) {
			await supabase
				.from("coupons")
				.update({ is_active: false })
				.eq("id", coupon.id);
			return res.status(404).json({ message: "Coupon expired" });
		}

		res.json({
			message: "Coupon is valid",
			code: coupon.code,
			discountPercentage: coupon.discount_percentage,
		});
	} catch (error) {
		console.log("Error in validateCoupon controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
