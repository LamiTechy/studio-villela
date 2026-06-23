import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(
	cors({
		origin: (origin, callback) => {
			// allow server-to-server or same-origin requests with no origin
			if (!origin) return callback(null, true);

			const allowedOrigins = [
				"http://localhost:5173",
				"http://127.0.0.1:5173",
				process.env.CLIENT_URL,
			].filter(Boolean);

			// allow exact matches or any Vercel preview/prod domain
			const isVercel = typeof origin === "string" && origin.endsWith(".vercel.app");

			if (allowedOrigins.includes(origin) || isVercel) {
				return callback(null, true);
			}

			return callback(new Error("Not allowed by CORS"), false);
		},
		credentials: true,
	})
);
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/api/debug", (req, res) => {
	res.json({
		origin: req.headers.origin || null,
		allowedOrigins: [
			"http://localhost:5173",
			"http://127.0.0.1:5173",
			process.env.CLIENT_URL,
		],
		CLIENT_URL: process.env.CLIENT_URL || null,
		NODE_ENV: process.env.NODE_ENV || null,
		PORT: process.env.PORT || null,
	});
});

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
});
