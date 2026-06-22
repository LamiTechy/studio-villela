import { supabase } from "../lib/supabase.js";

const mapProduct = (item) => ({ ...item, _id: item.id });

export const getCartProducts = async (req, res) => {
	try {
		const { data: cartItems, error: cartError } = await supabase
			.from("cart_items")
			.select("quantity, selected_size, products(*)")
			.eq("user_id", req.user.id);

		if (cartError) {
			throw cartError;
		}

		const response = cartItems.map((item) => ({
			...mapProduct(item.products),
			quantity: item.quantity,
			selectedSize: item.selected_size,
		}));

		res.json(response);
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
		const { productId, selectedSize = "M" } = req.body;

		const { data: existingItems, error: existingError } = await supabase
			.from("cart_items")
			.select("id, quantity")
			.eq("user_id", req.user.id)
			.eq("product_id", productId)
			.eq("selected_size", selectedSize);

		if (existingError) {
			throw existingError;
		}

		if (existingItems.length > 0) {
			const item = existingItems[0];
			const { error: updateError } = await supabase
				.from("cart_items")
				.update({ quantity: item.quantity + 1 })
				.eq("id", item.id);

			if (updateError) throw updateError;
		} else {
			const { error: insertError } = await supabase.from("cart_items").insert([
				{
					user_id: req.user.id,
					product_id: productId,
					selected_size: selectedSize,
					quantity: 1,
				},
			]);

			if (insertError) throw insertError;
		}

		res.json({ message: "Product added to cart" });
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeAllFromCart = async (req, res) => {
	try {
		const { productId, selectedSize } = req.body;

		const query = supabase.from("cart_items").delete().eq("user_id", req.user.id);
		if (productId) {
			query.eq("product_id", productId);
		}
		if (selectedSize) {
			query.eq("selected_size", selectedSize);
		}

		const { error } = await query;
		if (error) throw error;

		res.json({ message: "Cart updated" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateQuantity = async (req, res) => {
	try {
		const { id: productId } = req.params;
		const { quantity, selectedSize } = req.body;

		if (quantity === 0) {
			const { error } = await supabase
				.from("cart_items")
				.delete()
				.eq("user_id", req.user.id)
				.eq("product_id", productId)
				.eq("selected_size", selectedSize);

			if (error) throw error;
			return res.json({ message: "Cart item removed" });
		}

		const { data, error } = await supabase
			.from("cart_items")
			.update({ quantity })
			.eq("user_id", req.user.id)
			.eq("product_id", productId)
			.eq("selected_size", selectedSize);

		if (error) throw error;

		res.json({ message: "Quantity updated", quantity });
	} catch (error) {
		console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
