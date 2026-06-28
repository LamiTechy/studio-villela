import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import ContactSellerModal from "./ContactSellerModal";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);

	const savings = subtotal - total;
	const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

	const handlePayment = () => {
		setIsContactModalOpen(true);
	};

	return (
		<>
			<motion.div
				className='space-y-5 rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm p-5 sm:p-6 shadow-lg'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className='flex items-center gap-3'>
					<ShoppingBag className='text-emerald-400' size={20} />
					<p className='text-xl font-bold text-white font-display'>Order Summary</p>
				</div>

				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<span className='text-gray-400'>Items ({itemCount})</span>
						<span className='text-white font-medium'>${subtotal.toFixed(2)}</span>
					</div>

					{savings > 0 && (
						<div className='flex items-center justify-between text-emerald-400'>
							<span>Savings</span>
							<span className='font-medium'>-${savings.toFixed(2)}</span>
						</div>
					)}

					{coupon && isCouponApplied && (
						<div className='flex items-center justify-between text-emerald-400'>
							<span>Coupon ({coupon.code})</span>
							<span className='font-medium'>-{coupon.discountPercentage}%</span>
						</div>
					)}

					<div className='border-t border-gray-700/50 pt-3 mt-3'>
						<div className='flex items-center justify-between'>
							<span className='text-lg font-bold text-white'>Total</span>
							<span className='text-2xl font-bold text-emerald-400'>${total.toFixed(2)}</span>
						</div>
					</div>
				</div>

				<motion.button
					className='w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-emerald-500/30 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2'
					whileHover={{ scale: 1.01 }}
					whileTap={{ scale: 0.99 }}
					onClick={handlePayment}
				>
					<ShoppingBag size={18} />
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm text-gray-500'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</motion.div>
			<ContactSellerModal
				isOpen={isContactModalOpen}
				onClose={() => setIsContactModalOpen(false)}
				phoneNumber={import.meta.env.VITE_SELLER_PHONE || "+1 (555) 123-4567"}
			/>
		</>
	);
};
export default OrderSummary;