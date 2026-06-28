import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const wigOptions = ["Short", "Medium", "Long", "Extra Long"];

const ProductSkeleton = () => (
	<div className='min-h-screen bg-gray-950 text-white py-12 animate-pulse'>
		<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
			<div className='h-10 w-24 bg-gray-800 rounded-full mb-8' />
			<div className='grid gap-8 lg:grid-cols-2 items-start'>
				<div className='aspect-[4/3] rounded-3xl bg-gray-800' />
				<div className='space-y-6'>
					<div className='space-y-3'>
						<div className='h-4 w-32 bg-gray-800 rounded' />
						<div className='h-10 w-3/4 bg-gray-800 rounded' />
						<div className='h-20 bg-gray-800 rounded' />
					</div>
					<div className='rounded-3xl border border-gray-800 bg-gray-900/80 p-6'>
						<div className='h-6 w-24 bg-gray-800 rounded mb-4' />
						<div className='flex gap-3 mb-6'>
							{sizeOptions.slice(0, 4).map((s) => (
								<div key={s} className='h-10 w-14 bg-gray-800 rounded-full' />
							))}
						</div>
						<div className='h-14 bg-gray-800 rounded-3xl' />
					</div>
				</div>
			</div>
		</div>
	</div>
);

const ProductPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { products, fetchAllProducts, fetchProductById } = useProductStore();
	const { addToCart } = useCartStore();
	const { user } = useUserStore();
	const [product, setProduct] = useState(null);
	const [selectedSize, setSelectedSize] = useState("M");
	const [addingToCart, setAddingToCart] = useState(false);

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

	if (!product) return <ProductSkeleton />;

	const handleAddToCart = async () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		}
		setAddingToCart(true);
		await addToCart({ ...product, selectedSize });
		setAddingToCart(false);
		toast.success("Added to cart!");
		navigate("/cart");
	};

	return (
		<div className='min-h-screen bg-gray-950 text-white py-12'>
			<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between gap-4 mb-8'>
					<button
						className='inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/80 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-emerald-500 hover:text-emerald-400 hover:bg-gray-900'
						onClick={() => navigate(-1)}
					>
						<ArrowLeft className='h-4 w-4' />
						Back
					</button>
				</div>

				<div className='grid gap-8 lg:grid-cols-2 items-start'>
					<div className='rounded-3xl overflow-hidden border border-emerald-500/20 bg-gray-800/30 shadow-xl shadow-emerald-500/5'>
						<img
							src={product.image}
							alt={product.name}
							className='w-full object-contain max-h-[600px]'
						/>
					</div>

					<div className='space-y-6'>
						<div>
							<p className='text-sm uppercase tracking-[0.2em] text-emerald-400 mb-2 font-medium'>Product Details</p>
							<h1 className='text-4xl font-bold text-white font-display tracking-tight'>{product.name}</h1>
							<p className='mt-4 text-gray-400 leading-relaxed'>{product.description || "No description available."}</p>
						</div>

						<div className='rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-lg'>
							<div className='mb-6'>
								<h2 className='text-lg font-semibold text-white mb-3'>
									{product.category === "wigs" ? "Choose Length" : "Choose Size"}
								</h2>
								<div className='flex flex-wrap gap-2'>
									{(product.category === "wigs" ? wigOptions : sizeOptions).map((option) => (
										<button
											key={option}
											onClick={() => setSelectedSize(option)}
											className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
												selectedSize === option
													? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10"
													: "border-gray-700 text-gray-400 hover:border-emerald-500/50 hover:text-white"
											}`}
										>
											{option}
										</button>
									))}
								</div>
							</div>

							<div className='grid gap-4 sm:grid-cols-2 mb-6'>
								<div className='rounded-xl border border-gray-800 bg-gray-950/80 p-5'>
									<p className='text-sm uppercase tracking-[0.1em] text-gray-500 font-medium'>Price</p>
									<p className='mt-2 text-3xl font-bold text-emerald-400'>${product.price.toFixed(2)}</p>
								</div>
								<div className='rounded-xl border border-gray-800 bg-gray-950/80 p-5'>
									<p className='text-sm uppercase tracking-[0.1em] text-gray-500 font-medium'>{product.category === "wigs" ? "Length" : "Selected"}</p>
									<p className='mt-2 text-3xl font-bold text-white'>{selectedSize}</p>
								</div>
							</div>

							<button
								onClick={handleAddToCart}
								disabled={addingToCart}
								className='w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/20 transition-all duration-200 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-emerald-500/30 disabled:opacity-50 active:scale-[0.99] flex items-center justify-center gap-2'
							>
								{addingToCart ? (
									<div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
								) : (
									<>
										<ShoppingCart size={20} />
										Add to Cart
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;