import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import axios from "../lib/axios";

const tabs = [
	{ id: "all", label: "All" },
	{ id: "dress", label: "Dress" },
	{ id: "wigs", label: "Wigs" },
];

const SkeletonGrid = () => (
	<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
		{[...Array(4)].map((_, i) => (
			<div key={i} className='rounded-2xl border border-gray-700/50 bg-gray-800/40 p-3 animate-pulse'>
				<div className='aspect-square rounded-xl bg-gray-700/50 mb-4' />
				<div className='space-y-2 px-2 pb-2'>
					<div className='h-4 bg-gray-700/50 rounded w-3/4' />
					<div className='h-6 bg-gray-700/50 rounded w-1/4' />
					<div className='h-10 bg-gray-700/50 rounded-xl w-full' />
				</div>
			</div>
		))}
	</div>
);

const CategoryPage = () => {
	const { category } = useParams();
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const res = await axios.get(`/products/category/${category}`);
				setProducts(res.data.products || res.data);
			} catch {
				setProducts([]);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, [category]);

	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-white mb-2 font-display tracking-tight'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				<div className='flex justify-center gap-2 mt-8 mb-10'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => navigate(`/category/${tab.id}`)}
							className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
								category === tab.id
									? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
									: "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-emerald-500/50 hover:text-white"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{isLoading ? (
					<SkeletonGrid />
				) : products.length === 0 ? (
					<h2 className='text-2xl font-semibold text-gray-500 text-center col-span-full py-20'>
						No products found
					</h2>
				) : (
					<motion.div
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						{products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
};
export default CategoryPage;