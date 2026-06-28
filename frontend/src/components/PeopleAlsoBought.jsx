import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const ProductSkeleton = () => (
	<div className='rounded-2xl border border-gray-700/50 bg-gray-800/40 p-3 animate-pulse'>
		<div className='aspect-square rounded-xl bg-gray-700/50 mb-4' />
		<div className='space-y-2 px-2 pb-2'>
			<div className='h-4 bg-gray-700/50 rounded w-3/4' />
			<div className='h-6 bg-gray-700/50 rounded w-1/4' />
			<div className='h-10 bg-gray-700/50 rounded-xl w-full' />
		</div>
	</div>
);

const PeopleAlsoBought = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
				toast.error(error.response?.data?.message || "An error occurred while fetching recommendations");
			} finally {
				setIsLoading(false);
			}
		};
		fetchRecommendations();
	}, []);

	return (
		<div className='mt-8'>
			<h3 className='text-2xl font-bold text-white mb-6 font-display'>People also bought</h3>
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
				{isLoading ? (
					<>
						<ProductSkeleton />
						<ProductSkeleton />
					</>
				) : (
					recommendations.map((product) => (
						<ProductCard key={product._id} product={product} />
					))
				)}
			</div>
		</div>
	);
};
export default PeopleAlsoBought;