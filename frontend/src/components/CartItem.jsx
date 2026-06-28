import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";
import toast from "react-hot-toast";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();
	const [removing, setRemoving] = useState(false);

	const handleRemove = async () => {
		setRemoving(true);
		try {
			await removeFromCart(item._id, item.selectedSize);
		} catch {
			toast.error("Failed to remove item");
		}
		setRemoving(false);
	};

	const handleQuantity = async (newQty) => {
		if (newQty < 1) return;
		try {
			await updateQuantity(item._id, newQty, item.selectedSize);
		} catch {
			toast.error("Failed to update quantity");
		}
	};

	return (
		<div className='rounded-xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm p-4 md:p-5 shadow-lg transition-all duration-300 hover:border-gray-600/50'>
			<div className='flex items-center gap-4 md:gap-6'>
				<div className='shrink-0'>
					<img
						className='h-20 w-20 md:h-28 md:w-28 rounded-xl object-cover'
						src={item.image}
						alt={item.name}
						loading='lazy'
					/>
				</div>

				<div className='flex-1 min-w-0'>
					<p className='text-base font-semibold text-white truncate'>{item.name}</p>
					{item.selectedSize && (
						<p className='text-sm text-emerald-400 mt-0.5'>Size: {item.selectedSize}</p>
					)}
					<p className='text-sm text-gray-400 mt-1 line-clamp-1'>{item.description}</p>

					<div className='flex items-center gap-4 mt-3'>
						<div className='flex items-center gap-1'>
							<button
								className='inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-600 bg-gray-700/50 hover:bg-gray-600 transition-colors'
								onClick={() => handleQuantity(item.quantity - 1)}
								aria-label='Decrease quantity'
							>
								<Minus size={14} className='text-gray-300' />
							</button>
							<span className='w-8 text-center text-sm font-medium text-white'>{item.quantity}</span>
							<button
								className='inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-600 bg-gray-700/50 hover:bg-gray-600 transition-colors'
								onClick={() => handleQuantity(item.quantity + 1)}
								aria-label='Increase quantity'
							>
								<Plus size={14} className='text-gray-300' />
							</button>
						</div>
						<span className='text-base font-bold text-emerald-400 ml-auto'>${item.price}</span>
					</div>
				</div>

				<button
					onClick={handleRemove}
					disabled={removing}
					className='shrink-0 p-2 text-gray-500 hover:text-red-400 transition-colors hover:bg-red-400/10 rounded-lg'
					aria-label={`Remove ${item.name} from cart`}
				>
					<Trash2 size={18} />
				</button>
			</div>
		</div>
	);
};
export default CartItem;