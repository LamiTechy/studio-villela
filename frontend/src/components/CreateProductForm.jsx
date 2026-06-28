import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, ImageIcon } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		image: "",
		imageUrl: "",
	});

	const fileInputRef = useRef(null);
	const navigate = useNavigate();
	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!newProduct.name || !newProduct.description || !newProduct.price) {
			toast.error("Please fill in all required fields");
			return;
		}

		try {
			const payload = {
				name: newProduct.name,
				description: newProduct.description,
				price: newProduct.price,
				image: newProduct.imageUrl || newProduct.image,
			};

			await createProduct(payload);
			toast.success("Product created!");
			setNewProduct({ name: "", description: "", price: "", image: "", imageUrl: "" });
			navigate("/");
		} catch {
			toast.error("Failed to create product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		if (file.size > 5 * 1024 * 1024) {
			toast.error("Image must be under 5MB");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setNewProduct({ ...newProduct, image: reader.result, imageUrl: "" });
		};
		reader.readAsDataURL(file);
	};

	return (
		<motion.div
			className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 shadow-xl shadow-emerald-500/5 rounded-2xl p-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-bold text-white mb-6 font-display'>Create New Product</h2>

			<form onSubmit={handleSubmit} className='space-y-5'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-300 mb-1.5'>
						Product Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='block w-full rounded-xl border border-gray-600 bg-gray-700/50 py-2.5 px-4 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none transition-colors'
						placeholder='Summer Dress'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-300 mb-1.5'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='block w-full rounded-xl border border-gray-600 bg-gray-700/50 py-2.5 px-4 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none transition-colors resize-none'
						placeholder='A beautiful summer dress...'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-gray-300 mb-1.5'>
						Price
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='0.01'
						min='0'
						className='block w-full rounded-xl border border-gray-600 bg-gray-700/50 py-2.5 px-4 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none transition-colors'
						placeholder='49.99'
						required
					/>
				</div>

				<div className='space-y-1'>
					<label className='block text-sm font-medium text-gray-300 mb-1.5'>
						Product Image
					</label>
					<div className='grid gap-4 md:grid-cols-2'>
						<div>
							<input
								type='url'
								id='imageUrl'
								name='imageUrl'
								value={newProduct.imageUrl}
								onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value, image: "" })}
								placeholder='https://example.com/image.jpg'
								className='block w-full rounded-xl border border-gray-600 bg-gray-700/50 py-2.5 px-4 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none transition-colors'
							/>
						</div>
						<div>
							<input
								type='file'
								id='image'
								ref={fileInputRef}
								className='sr-only'
								accept='image/*'
								onChange={handleImageChange}
							/>
							<label
								htmlFor='image'
								className='flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-600 bg-gray-700/30 py-2.5 px-4 text-sm font-medium text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-200 cursor-pointer'
							>
								<Upload className='h-4 w-4' />
								Upload Image
							</label>
						</div>
					</div>
					<p className='text-xs text-gray-500 mt-1.5'>
						Paste an image URL or upload a file (max 5MB).
					</p>
				</div>

				{(newProduct.image || newProduct.imageUrl) && (
					<div className='rounded-xl border border-gray-700/50 bg-gray-900/60 p-3'>
						<p className='text-xs font-medium text-gray-400 mb-2 flex items-center gap-1.5'>
							<ImageIcon size={14} />
							Preview
						</p>
						<img
							src={newProduct.imageUrl || newProduct.image}
							alt='Product preview'
							className='h-48 w-full rounded-lg object-contain border border-gray-700/50 bg-gray-950'
							loading='lazy'
						/>
					</div>
				)}

				<button
					type='submit'
					className='w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='h-5 w-5 animate-spin' aria-hidden='true' />
							Creating...
						</>
					) : (
						<>
							<PlusCircle className='h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm;