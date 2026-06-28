import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className='py-8 md:py-16'>
			<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
				{cart.length > 0 && (
					<h1 className='text-3xl font-bold text-white mb-8 font-display'>
						Shopping Cart
						<span className='text-gray-500 text-lg font-normal ml-2'>({cart.length} items)</span>
					</h1>
				)}
				<div className='mt-6 sm:mt-8 md:gap-8 lg:flex lg:items-start xl:gap-10'>
					<motion.div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className='space-y-4'>
								{cart.map((item) => (
									<CartItem key={`${item._id}-${item.selectedSize || "default"}`} item={item} />
								))}
							</div>
						)}
						{cart.length > 0 && <PeopleAlsoBought />}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className='mx-auto mt-8 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full lg:sticky lg:top-24'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
							<GiftCouponCard />
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};
export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-6 py-20'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='rounded-full bg-gray-800/60 p-6 border border-gray-700/50'>
			<ShoppingBag className='h-16 w-16 text-gray-500' />
		</div>
		<div className='text-center'>
			<h3 className='text-2xl font-bold text-white mb-2 font-display'>Your cart is empty</h3>
			<p className='text-gray-400 max-w-sm'>Looks like you haven't added anything to your cart yet. Browse our collection and find something you love.</p>
		</div>
		<Link
			className='inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-white font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200 shadow-lg shadow-emerald-500/20'
			to='/'
		>
			Start Shopping
			<ArrowRight size={18} />
		</Link>
	</motion.div>
);