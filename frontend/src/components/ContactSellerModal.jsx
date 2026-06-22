import { motion } from "framer-motion";
import { Phone, X } from "lucide-react";

const ContactSellerModal = ({ isOpen, onClose, phoneNumber = "+1 (555) 123-4567" }) => {
	if (!isOpen) return null;

	return (
		<motion.div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className='relative w-full max-w-md rounded-2xl border border-emerald-500/30 bg-gray-900 p-8 shadow-2xl'
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
			>
				<button
					onClick={onClose}
					className='absolute right-4 top-4 text-gray-400 hover:text-white'
				>
					<X size={24} />
				</button>

				<div className='space-y-6 text-center'>
					<div className='flex justify-center'>
						<div className='rounded-full bg-emerald-500/20 p-4'>
							<Phone className='h-8 w-8 text-emerald-400' />
						</div>
					</div>

					<div className='space-y-2'>
						<h2 className='text-2xl font-bold text-white'>Contact Our Sales Team</h2>
						<p className='text-gray-400'>
							Thank you for your order! Please contact us to complete your purchase.
						</p>
					</div>

					<div className='space-y-4 rounded-lg border border-gray-700 bg-gray-800/50 p-6'>
						<p className='text-sm uppercase tracking-wider text-gray-300'>Seller Phone Number</p>
						<a
							href={`tel:${phoneNumber}`}
							className='inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-emerald-500'
						>
							<Phone size={20} />
							{phoneNumber}
						</a>
					</div>

					<p className='text-sm text-gray-400'>
						Our team will help you complete the transaction and answer any questions you may have.
					</p>

					<button
						onClick={onClose}
						className='w-full rounded-lg border border-gray-600 bg-gray-800 px-6 py-3 font-semibold text-white transition hover:bg-gray-700'
					>
						Close
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default ContactSellerModal;
