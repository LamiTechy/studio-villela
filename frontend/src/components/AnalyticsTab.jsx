import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
					{[...Array(4)].map((_, i) => (
						<div key={i} className='bg-gray-800/40 rounded-2xl p-6 animate-pulse'>
							<div className='h-4 bg-gray-700/50 rounded w-24 mb-3' />
							<div className='h-8 bg-gray-700/50 rounded w-16' />
						</div>
					))}
				</div>
				<div className='bg-gray-800/40 rounded-2xl p-6 animate-pulse h-[400px]' />
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				<AnalyticsCard title='Total Users' value={analyticsData.users.toLocaleString()} icon={Users} />
				<AnalyticsCard title='Total Products' value={analyticsData.products.toLocaleString()} icon={Package} />
				<AnalyticsCard title='Total Sales' value={analyticsData.totalSales.toLocaleString()} icon={ShoppingCart} />
				<AnalyticsCard title='Total Revenue' value={`$${analyticsData.totalRevenue.toLocaleString()}`} icon={DollarSign} />
			</div>
			<motion.div
				className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-lg'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<div className='flex items-center gap-3 mb-6'>
					<TrendingUp className='text-emerald-400' size={20} />
					<h3 className='text-lg font-bold text-white font-display'>Sales Overview</h3>
				</div>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.05)' />
						<XAxis dataKey='name' stroke='#9CA3AF' tick={{ fontSize: 12 }} />
						<YAxis yAxisId='left' stroke='#9CA3AF' tick={{ fontSize: 12 }} />
						<YAxis yAxisId='right' orientation='right' stroke='#9CA3AF' tick={{ fontSize: 12 }} />
						<Tooltip
							contentStyle={{
								background: '#1f2937',
								border: '1px solid rgba(16,185,129,0.2)',
								borderRadius: '12px',
								color: '#fff',
							}}
						/>
						<Legend />
						<Line yAxisId='left' type='monotone' dataKey='sales' stroke='#10B981' strokeWidth={2} activeDot={{ r: 6 }} name='Sales' />
						<Line yAxisId='right' type='monotone' dataKey='revenue' stroke='#3B82F6' strokeWidth={2} activeDot={{ r: 6 }} name='Revenue' />
					</LineChart>
				</ResponsiveContainer>
			</motion.div>
		</div>
	);
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon }) => (
	<motion.div
		className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex items-start justify-between relative z-10'>
			<div>
				<p className='text-gray-400 text-sm font-medium mb-1'>{title}</p>
				<h3 className='text-white text-3xl font-bold'>{value}</h3>
			</div>
			<div className='rounded-xl bg-emerald-500/10 p-3 text-emerald-400'>
				<Icon className='h-6 w-6' />
			</div>
		</div>
		<div className='absolute -bottom-6 -right-6 text-emerald-500/5 group-hover:text-emerald-500/10 transition-all duration-500'>
			<Icon className='h-32 w-32' />
		</div>
	</motion.div>
);