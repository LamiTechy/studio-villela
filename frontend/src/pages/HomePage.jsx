import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const HomePage = () => {
	const { fetchAllProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24'>
				{/* Hero */}
				<div className='text-center mb-20'>
					<div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6 animate-fade-in'>
						<Sparkles size={16} />
						New Collection 2026
					</div>
					<h1 className='text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 font-display leading-[1.1] tracking-tight'>
						<span className='bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent'>
							Women's Fashion
						</span>
						<br />
						Collections
					</h1>
					<p className='text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed'>
						Discover the latest trends in women's eco-friendly fashion. 
						Sustainable style meets timeless elegance.
					</p>
					<Link
						to='/category/all'
						className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3.5 text-white font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40'
					>
						Shop Now
						<ArrowRight size={18} />
					</Link>
				</div>

				{/* Featured */}
				{!isLoading && products.length > 0 && (
					<div className='animate-fade-in'>
						<FeaturedProducts featuredProducts={products} />
					</div>
				)}
			</div>
		</div>
	);
};
export default HomePage;