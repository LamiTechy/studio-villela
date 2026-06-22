import { supabase } from "../lib/supabase.js";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);

		if (userError || !userData.user) {
			return res.status(401).json({ message: "Unauthorized - Invalid or expired access token" });
		}

		const { data: profile, error: profileError } = await supabase
			.from("profiles")
			.select("name, role")
			.eq("id", userData.user.id)
			.single();

		if (profileError) {
			return res.status(401).json({ message: "Unauthorized - User profile not found" });
		}

		req.user = {
			id: userData.user.id,
			email: userData.user.email,
			name: profile.name,
			role: profile.role || "customer",
		};

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};
