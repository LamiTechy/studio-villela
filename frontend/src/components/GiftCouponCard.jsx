import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Ticket, X, Check } from "lucide-react";
import toast from "react-hot-toast";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const [applying, setApplying] = useState(false);
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = async () => {
		if (!userInputCode.trim()) return;
		setApplying(true);
		try {
			await applyCoupon(userInputCode);
			toast.success("Coupon applied!");
		} catch {
			toast.error("Invalid coupon code");
		}
		setApplying(false);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
		toast.success("Coupon removed");
	};

	return (
		<motion.div
			className='rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className='flex items-center gap-3 mb-5'>
				<Ticket className='text-pink-600' size={20} />
				<p className='text-lg font-bold text-gray-900 font-display'>Voucher & Gift Cards</p>
			</div>

			<div className='space-y-4'>
				<div>
					<label htmlFor='voucher' className='mb-2 block text-sm font-medium text-gray-600'>
						Do you have a voucher or gift card?
					</label>
					<div className='flex gap-2'>
						<input
							type='text'
							id='voucher'
							className='block w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500 focus:outline-none transition-colors'
							placeholder='Enter code here'
							value={userInputCode}
							onChange={(e) => setUserInputCode(e.target.value)}
							disabled={isCouponApplied}
						/>
						{!isCouponApplied ? (
							<motion.button
								type='button'
								className='rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 px-5 py-3 text-sm font-semibold text-white hover:from-pink-500 hover:to-pink-400 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-pink-500/20'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={handleApplyCoupon}
								disabled={applying || !userInputCode.trim()}
							>
								{applying ? (
									<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
								) : (
									"Apply"
								)}
							</motion.button>
						) : (
							<motion.button
								type='button'
								className='rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-all duration-200'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={handleRemoveCoupon}
							>
								<X size={18} />
							</motion.button>
						)}
					</div>
				</div>

				{isCouponApplied && coupon && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className='flex items-center gap-3 rounded-xl bg-pink-50 border border-pink-200 p-4'
					>
						<Check size={18} className='text-pink-600 shrink-0' />
						<div>
							<p className='text-sm font-semibold text-pink-600'>{coupon.code}</p>
							<p className='text-xs text-pink-500'>{coupon.discountPercentage}% discount applied</p>
						</div>
					</motion.div>
				)}

				{coupon && !isCouponApplied && (
					<div className='rounded-xl bg-pink-50/50 border border-pink-100 p-4'>
						<p className='text-sm text-gray-500'>Your available coupon:</p>
						<p className='text-sm font-semibold text-pink-600 mt-1'>
							{coupon.code} — {coupon.discountPercentage}% off
						</p>
					</div>
				)}
			</div>
		</motion.div>
	);
};
export default GiftCouponCard;