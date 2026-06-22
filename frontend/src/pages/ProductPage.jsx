import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useProductStore } from "../stores/useProductStore";

const sizeOptions = ["S", "M", "L", "XL", "XXL", "XXXL"];

const ProductPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { products, fetchAllProducts, fetchProductById } = useProductStore();
	const { addToCart } = useCartStore();
	const [product, setProduct] = useState(null);
	const [selectedSize, setSelectedSize] = useState("M");

	useEffect(() => {
		if (products.length === 0) {
			fetchAllProducts();
		}
	}, [fetchAllProducts, products.length]);

	useEffect(() => {
		const found = products.find((item) => item._id === id);
		if (found) {
			setProduct(found);
		} else {
			fetchProductById(id).then((fetched) => {
				if (fetched) setProduct(fetched);
			});
		}
	}, [id, products, fetchProductById]);

	if (!product) {
		return (
			<div className='min-h-screen flex items-center justify-center px-4 text-white'>
				<p className='text-lg font-medium'>Loading product details...</p>
			</div>
		);
	}

	const handleAddToCart = async () => {
		await addToCart({ ...product, selectedSize });
		navigate("/cart");
	};

	return (
		<div className='min-h-screen bg-gray-950 text-white py-12'>
			<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between gap-4 mb-6'>
					<button
						className='inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/80 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-300'
						onClick={() => navigate(-1)}
					>
						<ArrowLeft className='h-4 w-4' />
						Back
					</button>
				</div>

				<div className='grid gap-8 lg:grid-cols-2 items-start'>
					<div className='rounded-3xl overflow-hidden border border-emerald-500/30 bg-white/5 shadow-xl'>
						<img
							src={product.image}
							alt={product.name}
							className='w-full h-[420px] object-cover'
						/>
					</div>

					<div className='space-y-6'>
						<div>
							<p className='text-sm uppercase tracking-[0.3em] text-emerald-400 mb-2'>Product Details</p>
							<h1 className='text-4xl font-bold text-white'>{product.name}</h1>
							<p className='mt-4 text-gray-300 leading-8'>{product.description || "No description available."}</p>
						</div>

						<div className='rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-lg'>
							<div className='mb-6'>
								<h2 className='text-xl font-semibold text-white mb-3'>Choose Size</h2>
								<div className='flex flex-wrap gap-3'>
									{sizeOptions.map((size) => (
										<button
											key={size}
											onClick={() => setSelectedSize(size)}
											className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
												selectedSize === size
													? "border-emerald-400 bg-emerald-400/20 text-white"
												: "border-gray-700 text-gray-300 hover:border-emerald-400 hover:text-white"
											}`}
										>
											{size}
										</button>
									))}
								</div>
							</div>

							<div className='grid gap-4 sm:grid-cols-2'>
								<div className='rounded-3xl border border-gray-800 bg-gray-950/90 p-5'>
									<p className='text-sm uppercase tracking-[0.2em] text-gray-400'>Price</p>
									<p className='mt-2 text-3xl font-bold text-emerald-400'>${product.price.toFixed(2)}</p>
								</div>
								<div className='rounded-3xl border border-gray-800 bg-gray-950/90 p-5'>
									<p className='text-sm uppercase tracking-[0.2em] text-gray-400'>Selected</p>
									<p className='mt-2 text-3xl font-bold text-white'>{selectedSize}</p>
								</div>
							</div>

							<button
								onClick={handleAddToCart}
								className='w-full rounded-3xl bg-emerald-500 px-6 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/20 transition hover:bg-emerald-400'
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
