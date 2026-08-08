import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";

const ContactSellerModal = ({ isOpen, onClose, phoneNumber = "+1 (555) 123-4567" }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						className='relative w-full max-w-md rounded-2xl border border-pink-100 bg-white p-8 shadow-2xl shadow-pink-500/10'
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={onClose}
							className='absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors rounded-lg p-1.5 hover:bg-gray-100'
							aria-label='Close'
						>
							<X size={20} />
						</button>

						<div className='space-y-6 text-center'>
							<div className='flex justify-center'>
								<div className='rounded-full bg-gradient-to-br from-pink-100 to-rose-100 p-4'>
									<Phone className='h-8 w-8 text-pink-600' />
								</div>
							</div>

							<div className='space-y-2'>
								<h2 className='text-2xl font-bold text-gray-900 font-display'>Contact Our Sales Team</h2>
								<p className='text-gray-500 leading-relaxed'>
									Thank you for your order! Please contact us to complete your purchase.
								</p>
							</div>

							<div className='rounded-xl border border-pink-100 bg-pink-50/50 p-5'>
								<p className='text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium'>Seller Phone Number</p>
								<a
									href={`tel:${phoneNumber}`}
									className='inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-pink-500/20 hover:from-pink-500 hover:to-pink-400 transition-all duration-200'
								>
									<Phone size={18} />
									{phoneNumber}
								</a>
							</div>

							<p className='text-sm text-gray-400'>
								Our team will help you complete the transaction and answer any questions.
							</p>

							<button
								onClick={onClose}
								className='w-full rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-100 transition-all duration-200'
							>
								Close
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ContactSellerModal;