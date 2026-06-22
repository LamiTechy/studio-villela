import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const { addToCart } = useCartStore();

	return (
		<div className='py-12'>
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>Featured</h2>
				<div className='grid gap-6 sm:grid-cols-1 md:grid-cols-3'>
					{featuredProducts?.map((product) => (
						<div
							key={product._id}
							className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30'
						>
							<Link to={`/product/${product._id}`} className='block group'>
								<div className='overflow-hidden'>
									<img
										src={product.image}
										alt={product.name}
										className='w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
										loading='lazy'
									/>
								</div>
								<div className='p-4'>
									<h3 className='text-lg font-semibold mb-2 text-white'>{product.name}</h3>
									<p className='text-emerald-300 font-medium mb-4'>
										${product.price.toFixed(2)}
									</p>
								</div>
							</Link>
							<div className='p-4 pt-0'>
								<button
									onClick={() => addToCart(product)}
									className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center'
								>
									<ShoppingCart className='w-5 h-5 mr-2' />
									Add to Cart
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
