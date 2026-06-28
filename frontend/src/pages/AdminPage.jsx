import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-16'>
				<motion.h1
					className='text-4xl font-bold mb-2 text-center font-display tracking-tight'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<span className='bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
						Admin Dashboard
					</span>
				</motion.h1>
				<p className='text-gray-400 text-center mb-10'>Manage your store</p>

				<div className='flex justify-center mb-8 border-b border-gray-800/50'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
								activeTab === tab.id
									? "border-emerald-500 text-emerald-400"
									: "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
							}`}
						>
							<tab.icon className='mr-2 h-4 w-4' />
							{tab.label}
						</button>
					))}
				</div>
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					{activeTab === "create" && <CreateProductForm />}
					{activeTab === "products" && <ProductsList />}
					{activeTab === "analytics" && <AnalyticsTab />}
				</motion.div>
			</div>
		</div>
	);
};
export default AdminPage;