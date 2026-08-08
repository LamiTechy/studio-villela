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
						<div key={i} className='bg-white rounded-2xl p-6 animate-pulse'>
							<div className='h-4 bg-gray-200 rounded w-24 mb-3' />
							<div className='h-8 bg-gray-200 rounded w-16' />
						</div>
					))}
				</div>
				<div className='bg-white rounded-2xl p-6 animate-pulse h-[400px]' />
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
				className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<div className='flex items-center gap-3 mb-6'>
					<TrendingUp className='text-pink-600' size={20} />
					<h3 className='text-lg font-bold text-gray-900 font-display'>Sales Overview</h3>
				</div>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='rgba(0,0,0,0.06)' />
						<XAxis dataKey='name' stroke='#6B7280' tick={{ fontSize: 12 }} />
						<YAxis yAxisId='left' stroke='#6B7280' tick={{ fontSize: 12 }} />
						<YAxis yAxisId='right' orientation='right' stroke='#6B7280' tick={{ fontSize: 12 }} />
						<Tooltip
							contentStyle={{
								background: '#ffffff',
								border: '1px solid rgba(236,72,153,0.2)',
								borderRadius: '12px',
								color: '#1f2937',
							}}
						/>
						<Legend />
						<Line yAxisId='left' type='monotone' dataKey='sales' stroke='#EC4899' strokeWidth={2} activeDot={{ r: 6 }} name='Sales' />
						<Line yAxisId='right' type='monotone' dataKey='revenue' stroke='#8B5CF6' strokeWidth={2} activeDot={{ r: 6 }} name='Revenue' />
					</LineChart>
				</ResponsiveContainer>
			</motion.div>
		</div>
	);
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon }) => (
	<motion.div
		className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-pink-200 transition-all duration-300'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex items-start justify-between relative z-10'>
			<div>
				<p className='text-gray-500 text-sm font-medium mb-1'>{title}</p>
				<h3 className='text-gray-900 text-3xl font-bold'>{value}</h3>
			</div>
			<div className='rounded-xl bg-pink-50 p-3 text-pink-600'>
				<Icon className='h-6 w-6' />
			</div>
		</div>
		<div className='absolute -bottom-6 -right-6 text-pink-100 group-hover:text-pink-200 transition-all duration-500'>
			<Icon className='h-32 w-32' />
		</div>
	</motion.div>
);