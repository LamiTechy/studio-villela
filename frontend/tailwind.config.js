/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				display: ["Playfair Display", "serif"],
				body: ["Inter", "sans-serif"],
			},
			colors: {
				brand: {
					50: "#ecfdf5",
					100: "#d1fae5",
					200: "#a7f3d0",
					300: "#6ee7b7",
					400: "#34d399",
					500: "#10b981",
					600: "#059669",
					700: "#047857",
					800: "#065f46",
					900: "#064e3b",
					950: "#022c22",
				},
			},
			animation: {
				"fade-in": "fadeIn 0.6s ease-out",
				"slide-up": "slideUp 0.6s ease-out",
				"slide-down": "slideDown 0.3s ease-out",
				"scale-in": "scaleIn 0.3s ease-out",
				"glow-pulse": "glowPulse 2s ease-in-out infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				slideDown: {
					"0%": { opacity: "0", transform: "translateY(-10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				scaleIn: {
					"0%": { opacity: "0", transform: "scale(0.95)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				glowPulse: {
					"0%, 100%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)" },
					"50%": { boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)" },
				},
			},
		},
	},
	plugins: [],
};
