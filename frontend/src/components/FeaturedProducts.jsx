import { ShoppingCart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const { addToCart } = useCartStore();
	const { user } = useUserStore();

	const handleAddToCart = (product) => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		}
		addToCart(product);
	};

	return (
		<div className='py-8 sm:py-12'>
			<div className='flex items-center gap-3 mb-10'>
				<Sparkles className='text-pink-600' size={24} />
				<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 font-display tracking-tight'>Featured</h2>
				<div className='flex-1 h-px bg-gradient-to-r from-pink-500/50 to-transparent ml-4' />
			</div>
			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{featuredProducts?.slice(0, 3).map((product) => (
					<div
						key={product._id}
						className='group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 border border-gray-200 hover:border-pink-200 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-1'
					>
						<Link to={`/product/${product._id}`} className='block'>
							<div className='aspect-[4/3] overflow-hidden'>
								<img
									src={product.image}
									alt={product.name}
									className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
									loading='lazy'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
							</div>
						</Link>
						<div className='p-5'>
							<Link to={`/product/${product._id}`}>
								<h3 className='text-lg font-semibold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors duration-200'>{product.name}</h3>
							</Link>
							<p className='text-2xl font-bold text-pink-600 mb-4'>
								${product.price.toFixed(2)}
							</p>
							<button
								onClick={() => handleAddToCart(product)}
								className='w-full rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2.5 px-4 transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-pink-500/20 active:scale-[0.98]'
							>
								<ShoppingCart className='w-4 h-4' />
								Add to Cart
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FeaturedProducts;