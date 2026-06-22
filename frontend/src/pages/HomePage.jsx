import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const HomePage = () => {
	const { fetchAllProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Women's Fashion Collections
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in women's eco-friendly fashion
				</p>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};
export default HomePage;
