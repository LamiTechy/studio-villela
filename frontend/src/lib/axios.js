import axios from "axios";

const baseURL = import.meta.env.DEV
	? "http://localhost:5000/api"
	: (import.meta.env.VITE_API_URL || "https://your-render-backend.onrender.com/api");

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});

export default axiosInstance;
