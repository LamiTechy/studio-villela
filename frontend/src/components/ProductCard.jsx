import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		}
		addToCart(product);
	};

	return (
		<div className='group relative flex flex-col overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-500 w-full'>
			<Link to={`/product/${product._id}`} className='block'>
				<div className='relative mx-3 mt-3 aspect-square overflow-hidden rounded-xl'>
					<img
						className='object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110'
						src={product.image}
						alt={product.name}
						loading='lazy'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
					<span className={`absolute top-2 right-2 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize z-10 ${
						product.category === "wigs" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm"
					}`}>
						{product.category}
					</span>
				</div>
			</Link>

			<div className='mt-3 px-5 pb-5 flex-1 flex flex-col'>
				<Link to={`/product/${product._id}`}>
					<h5 className='text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-200 truncate'>{product.name}</h5>
				</Link>
				<div className='mt-2 mb-4 flex items-center justify-between'>
					<span className='text-2xl font-bold text-emerald-400'>${product.price}</span>
				</div>
				<button
					className='mt-auto flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-center text-sm font-semibold text-white hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.98]'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={18} className='mr-2' />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard;