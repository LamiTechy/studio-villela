import { supabase } from "../lib/supabase.js";

const setCookies = (res, session) => {
	res.cookie("accessToken", session.access_token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
		maxAge: 60 * 60 * 1000, // 1 hour instead of 15 minutes
	});

	res.cookie("refreshToken", session.refresh_token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};

const refreshSession = async (refreshToken) => {
	const url = `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({ refresh_token: refreshToken }),
	});

	if (!response.ok) {
		const errorBody = await response.json().catch(() => ({}));
		throw new Error(errorBody.error_description || "Unable to refresh session");
	}

	return await response.json();
};

export const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		const { data: userData, error: signUpError } = await supabase.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
			user_metadata: { name },
		});

		if (signUpError) {
			return res.status(400).json({ message: signUpError.message });
		}

		await supabase.from("profiles").insert({
			id: userData.user.id,
			name,
			role: "customer",
		});

		const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (loginError || !loginData.session) {
			return res.status(400).json({ message: loginError?.message || "Unable to sign in after signup" });
		}

		setCookies(res, loginData.session);

		res.status(201).json({
			_id: userData.user.id,
			name,
			email,
			role: "customer",
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error || !data.session) {
			return res.status(400).json({ message: error?.message || "Invalid email or password" });
		}

		const { data: profileData, error: profileError } = await supabase
			.from("profiles")
			.select("name, role")
			.eq("id", data.user.id)
			.single();

		if (profileError) {
			return res.status(500).json({ message: "Unable to load user profile" });
		}

		setCookies(res, data.session);

		res.json({
			_id: data.user.id,
			name: profileData.name,
			email: data.user.email,
			role: profileData.role || "customer",
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie("accessToken", {
			path: "/",
			sameSite: "none",
			secure: true,
		});
		res.clearCookie("refreshToken", {
			path: "/",
			sameSite: "none",
			secure: true,
		});
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const refreshToken = async (req, res) => {
	try {
		const refreshTokenCookie = req.cookies.refreshToken;

		if (!refreshTokenCookie) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const refreshed = await refreshSession(refreshTokenCookie);

		if (!refreshed.access_token) {
			return res.status(401).json({ message: "Unable to refresh session" });
		}

		setCookies(res, refreshed);
		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
