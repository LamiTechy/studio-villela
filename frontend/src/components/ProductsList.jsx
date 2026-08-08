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
			<div className='text-center py-16 text-gray-500'>
				<ShoppingBasket className='h-16 w-16 mx-auto mb-4 text-gray-300' />
				<p className='text-lg font-medium'>No products yet</p>
				<p className='text-sm mt-1'>Create your first product to get started.</p>
			</div>
		);
	}

	return (
		<motion.div
			className='bg-white border border-gray-200 shadow-xl shadow-pink-500/5 rounded-2xl overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='overflow-x-auto'>
				<table className='w-full divide-y divide-gray-100'>
					<thead className='bg-gray-50'>
						<tr>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Product</th>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Price</th>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Category</th>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Featured</th>
							<th scope='col' className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100'>
						{products.map((product) => (
							<tr key={product._id} className='hover:bg-pink-50/50 transition-colors duration-150'>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<img className='h-10 w-10 rounded-xl object-cover' src={product.image} alt={product.name} loading='lazy' />
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-900'>{product.name}</div>
										</div>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>${product.price.toFixed(2)}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{product.category || "—"}</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`p-1.5 rounded-lg transition-all duration-200 ${
											product.isFeatured
												? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
												: "bg-gray-100 text-gray-400 hover:bg-gray-200"
										}`}
										aria-label={product.isFeatured ? "Unmark featured" : "Mark as featured"}
									>
										<Star className='h-4 w-4' />
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => handleDelete(product._id)}
										className='p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200'
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