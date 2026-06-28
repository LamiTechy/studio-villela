import fs from "fs";
import path from "path";
import { supabase } from "../lib/supabase.js";
import cloudinary from "../lib/cloudinary.js";

const logFile = path.resolve(process.cwd(), "backend", "create-product-debug.log");
const log = (message) => {
	const timestamp = new Date().toISOString();
	fs.appendFileSync(logFile, `${timestamp} - ${message}\n`);
};

const mapProduct = (product) => ({ ...product, _id: product.id });

const uploadImage = async (imageBase64OrUrl) => {
	if (!imageBase64OrUrl) return "";

	if (imageBase64OrUrl.startsWith("http://") || imageBase64OrUrl.startsWith("https://")) {
		return imageBase64OrUrl;
	}

	const [prefix, base64Data] = imageBase64OrUrl.split(",");
	const match = prefix.match(/data:(.*);base64/);
	const buffer = Buffer.from(base64Data, "base64");

	const uploadStream = await new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{ folder: "products" },
			(error, result) => {
				if (error) return reject(error);
				resolve(result);
			}
		);

		stream.end(buffer);
	});

	return uploadStream.secure_url;
};

export const getAllProducts = async (req, res) => {
	try {
		const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });

		if (error) {
			throw error;
		}

		res.json({ products: data.map(mapProduct) });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("is_featured", true)
			.order("created_at", { ascending: false });

		if (error) {
			throw error;
		}

		res.json(data.map(mapProduct));
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

		if (error) {
			throw error;
		}

		res.json(mapProduct(data));
	} catch (error) {
		console.log("Error in getProductById controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
const { name, description, price, category, image } = req.body;
	const imageUrl = image ? await uploadImage(image) : "";

	const result = await supabase
		.from("products")
		.insert([
			{
				name,
				description,
				price: Number(price),
				image: imageUrl,
				category: category || "dress",
					is_featured: true,
				},
			])
			.select();

		log(`Supabase insert result: ${JSON.stringify(result)}`);
		console.log("Supabase insert result", result);

		if (result.error) {
			log(`Supabase insert error: ${JSON.stringify(result.error)} body: ${JSON.stringify(req.body)}`);
			console.log("Supabase insert error", { error: result.error, body: req.body });
			throw result.error;
		}

		const data = result.data;

		if (!data || data.length === 0) {
			console.log("createProduct returned no data", { data, body: req.body, result });
			return res.status(500).json({ message: "Product creation failed", error: "No row returned from database" });
		}

		res.status(201).json(mapProduct(data[0]));
	} catch (error) {
		console.log("Error in createProduct controller", error.message || error);
		res.status(500).json({ message: "Server error", error: error.message || error });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const { error: deleteError } = await supabase.from("products").delete().eq("id", productId);
		if (deleteError) {
			throw deleteError;
		}

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const { data, error } = await supabase.from("products").select("*");

		if (error) {
			throw error;
		}

		const recommended = data
			.sort(() => 0.5 - Math.random())
			.slice(0, 4)
			.map(mapProduct);

		res.json(recommended);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		let query = supabase.from("products").select("*");

		if (category !== "all") {
			query = query.eq("category", category);
		}

		const { data, error } = await query.order("created_at", { ascending: false });

		if (error) {
			throw error;
		}

		res.json({ products: data.map(mapProduct) });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const { data: currentProduct, error: fetchError } = await supabase
			.from("products")
			.select("is_featured")
			.eq("id", productId)
			.single();

		if (fetchError || !currentProduct) {
			return res.status(404).json({ message: "Product not found" });
		}

		const { data: updatedProduct, error: updateError } = await supabase
			.from("products")
			.update({ is_featured: !currentProduct.is_featured })
			.eq("id", productId)
			.single();

		if (updateError) {
			throw updateError;
		}

		res.json(mapProduct(updatedProduct));
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};