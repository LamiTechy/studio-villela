import axios from "axios";

const baseURL = import.meta.env.DEV
	? "http://localhost:5000/api"
	: (import.meta.env.VITE_API_URL || "https://your-render-backend.onrender.com/api");

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});

// Add Authorization header if token exists in localStorage
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
