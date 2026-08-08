import { ArrowRight, CheckCircle, HandHeart, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", { sessionId });
				clearCart();
			} catch (err) {
				setError(err.response?.data?.message || "Something went wrong");
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) {
		return (
			<div className='h-screen flex items-center justify-center'>
				<div className='flex flex-col items-center gap-4'>
					<div className='w-12 h-12 border-2 border-pink-500 border-t-transparent rounded-full animate-spin' />
					<p className='text-gray-500 font-medium'>Processing your order...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='h-screen flex items-center justify-center px-4'>
				<div className='max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm'>
					<div className='text-red-500 text-5xl mb-4'>!</div>
					<h2 className='text-xl font-bold text-gray-900 mb-2'>Something went wrong</h2>
					<p className='text-gray-500 mb-6'>{error}</p>
					<Link
						to='/'
						className='inline-flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 text-gray-800 font-semibold hover:bg-gray-200 transition-all'
					>
						Back to Shop
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='h-screen flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-pink-500/10 overflow-hidden relative z-10'>
				<div className='p-8'>
					<div className='flex justify-center mb-6'>
						<div className='rounded-full bg-pink-50 p-4'>
							<CheckCircle className='text-pink-600 w-14 h-14' />
						</div>
					</div>
					<h1 className='text-3xl font-bold text-center text-gray-900 mb-2 font-display'>
						Purchase Successful!
					</h1>
					<p className='text-gray-500 text-center mb-6 leading-relaxed'>
						Thank you for your order. We're processing it now. You'll receive a confirmation email shortly.
					</p>
					<div className='bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 space-y-3'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2 text-gray-500'>
								<Package size={16} />
								<span className='text-sm'>Order number</span>
							</div>
							<span className='text-sm font-semibold text-pink-600'>#12345</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2 text-gray-500'>
								<Package size={16} />
								<span className='text-sm'>Estimated delivery</span>
							</div>
							<span className='text-sm font-semibold text-pink-600'>3-5 business days</span>
						</div>
					</div>

					<div className='space-y-3'>
						<button
							className='w-full rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 py-3 text-white font-semibold shadow-lg shadow-pink-500/20 hover:from-pink-500 hover:to-pink-400 transition-all duration-200 flex items-center justify-center gap-2'
						>
							<HandHeart size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to={"/"}
							className='w-full rounded-xl border border-gray-200 bg-gray-50 py-3 text-pink-600 font-semibold hover:bg-pink-50 transition-all duration-200 flex items-center justify-center gap-2'
						>
							Continue Shopping
							<ArrowRight size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;