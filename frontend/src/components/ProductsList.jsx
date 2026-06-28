import { motion } from "framer-motion";
import { Trash2, Star, ShoppingBasket } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this product?")) return;
		try {
			await deleteProduct(id);
			toast.success("Product deleted");
		} catch {
			toast.error("Failed to delete product");
		}
	};

	if (products.length === 0) {
		return (
			<div className='text-center py-16 text-gray-400'>
				<ShoppingBasket className='h-16 w-16 mx-auto mb-4 text-gray-600' />
				<p className='text-lg font-medium'>No products yet</p>
				<p className='text-sm mt-1'>Create your first product to get started.</p>
			</div>
		);
	}

	return (
		<motion.div
			className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 shadow-xl shadow-emerald-500/5 rounded-2xl overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='overflow-x-auto'>
				<table className='w-full divide-y divide-gray-700/50'>
					<thead className='bg-gray-800/80'>
						<tr>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Product</th>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Price</th>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Category</th>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Featured</th>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-700/50'>
						{products.map((product) => (
							<tr key={product._id} className='hover:bg-gray-700/20 transition-colors duration-150'>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<img className='h-10 w-10 rounded-xl object-cover' src={product.image} alt={product.name} loading='lazy' />
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-white'>{product.name}</div>
										</div>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>${product.price.toFixed(2)}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-400'>{product.category || "—"}</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`p-1.5 rounded-lg transition-all duration-200 ${
											product.isFeatured
												? "bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30"
												: "bg-gray-700/50 text-gray-500 hover:bg-gray-600/50"
										}`}
										aria-label={product.isFeatured ? "Unmark featured" : "Mark as featured"}
									>
										<Star className='h-4 w-4' />
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => handleDelete(product._id)}
										className='p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200'
										aria-label={`Delete ${product.name}`}
									>
										<Trash2 className='h-4 w-4' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default ProductsList;