import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

const NotFoundPage = () => (
	<div className="min-h-screen flex flex-col items-center justify-center px-4">
		<h1 className="text-8xl font-black text-emerald-500 mb-4 font-display">404</h1>
		<p className="text-2xl text-gray-300 mb-8 font-display">Page not found</p>
		<p className="text-gray-400 mb-8 text-center max-w-md">
			The page you're looking for doesn't exist or has been moved.
		</p>
		<a
			href="/"
			className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-500 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
		>
			Back to Home
		</a>
	</div>
);

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();

	useEffect(() => {
		checkAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!user) return;
		getCartItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-gray-950 text-white font-body relative overflow-hidden'>
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15)_0%,rgba(10,80,60,0.1)_45%,rgba(0,0,0,0)_100%)]' />
				</div>
			</div>

			<div className='relative z-50 pt-20'>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/product/:id' element={<ProductPage />} />
					<Route path='/category/:category' element={<CategoryPage />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</div>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 4000,
					style: {
						background: "#1f2937",
						color: "#fff",
						border: "1px solid rgba(16,185,129,0.2)",
					},
					success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
					error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
				}}
			/>
		</div>
	);
}

export default App;
