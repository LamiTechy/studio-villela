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
						className='relative w-full max-w-md rounded-2xl border border-emerald-500/20 bg-gray-900 p-8 shadow-2xl shadow-emerald-500/10'
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={onClose}
							className='absolute right-4 top-4 text-gray-500 hover:text-white transition-colors rounded-lg p-1.5 hover:bg-gray-800'
							aria-label='Close'
						>
							<X size={20} />
						</button>

						<div className='space-y-6 text-center'>
							<div className='flex justify-center'>
								<div className='rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 p-4'>
									<Phone className='h-8 w-8 text-emerald-400' />
								</div>
							</div>

							<div className='space-y-2'>
								<h2 className='text-2xl font-bold text-white font-display'>Contact Our Sales Team</h2>
								<p className='text-gray-400 leading-relaxed'>
									Thank you for your order! Please contact us to complete your purchase.
								</p>
							</div>

							<div className='rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-5'>
								<p className='text-xs uppercase tracking-wider text-gray-400 mb-3 font-medium'>Seller Phone Number</p>
								<a
									href={`tel:${phoneNumber}`}
									className='inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200'
								>
									<Phone size={18} />
									{phoneNumber}
								</a>
							</div>

							<p className='text-sm text-gray-500'>
								Our team will help you complete the transaction and answer any questions.
							</p>

							<button
								onClick={onClose}
								className='w-full rounded-xl border border-gray-700 bg-gray-800/50 px-6 py-3 font-semibold text-gray-300 hover:bg-gray-700 transition-all duration-200'
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