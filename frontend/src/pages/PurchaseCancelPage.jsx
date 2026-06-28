import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden relative z-10'
			>
				<div className='p-8'>
					<div className='flex justify-center mb-6'>
						<div className='rounded-full bg-red-500/10 p-4'>
							<XCircle className='text-red-400 w-14 h-14' />
						</div>
					</div>
					<h1 className='text-3xl font-bold text-center text-white mb-2 font-display'>Purchase Cancelled</h1>
					<p className='text-gray-400 text-center mb-6 leading-relaxed'>
						Your order has been cancelled. No charges have been made.
					</p>
					<div className='bg-gray-800/80 border border-gray-700/50 rounded-xl p-5 mb-6'>
						<div className='flex items-start gap-3'>
							<HelpCircle className='text-gray-500 mt-0.5 shrink-0' size={18} />
							<p className='text-sm text-gray-400 leading-relaxed'>
								If you encountered any issues during the checkout process, please don't hesitate to contact our support team.
							</p>
						</div>
					</div>
					<Link
						to={"/"}
						className='w-full rounded-xl border border-gray-700 bg-gray-800/50 py-3 text-gray-300 font-semibold hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2'
					>
						<ArrowLeft size={18} />
						Return to Shop
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;