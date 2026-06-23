import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,

	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password });
			// Store token in localStorage as fallback for cookies
			if (res.data.accessToken) {
				localStorage.setItem("accessToken", res.data.accessToken);
			}
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
	login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/login", { email, password });

			// Store token in localStorage as fallback for cookies
			if (res.data.accessToken) {
				localStorage.setItem("accessToken", res.data.accessToken);
			}
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

	logout: async () => {
		try {
			await axios.post("/auth/logout");
			localStorage.removeItem("accessToken");
			set({ user: null });
		} catch (error) {
			localStorage.removeItem("accessToken");
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			// Store token if returned
			if (response.data.accessToken) {
				localStorage.setItem("accessToken", response.data.accessToken);
			}
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.error("checkAuth error:", error.response?.data?.message || error.message);
			localStorage.removeItem("accessToken");
			set({ checkingAuth: false, user: null });
		}
	},

	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;
let isRefreshing = false;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		
		// Check if this is a 401 and we haven't already retried
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// If we're already refreshing, wait for it
			if (isRefreshing && refreshPromise) {
				try {
					await refreshPromise;
					return axios(originalRequest);
				} catch (err) {
					return Promise.reject(err);
				}
			}

			// Start a new refresh
			if (!isRefreshing) {
				isRefreshing = true;
				refreshPromise = useUserStore
					.getState()
					.refreshToken()
					.then(() => {
						isRefreshing = false;
						refreshPromise = null;
						return axios(originalRequest);
					})
					.catch((err) => {
						isRefreshing = false;
						refreshPromise = null;
						// Only logout if it's not a "no refresh token" error
						// (that means user was never logged in)
						if (err.response?.data?.message !== "No refresh token provided") {
							useUserStore.getState().logout();
						}
						return Promise.reject(err);
					});

				return refreshPromise;
			}
		}
		return Promise.reject(error);
	}
);
