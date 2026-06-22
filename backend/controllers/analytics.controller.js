import { supabase } from "../lib/supabase.js";

export const getAnalyticsData = async () => {
	const { count: totalUsers, error: usersError } = await supabase.from("profiles").select("id", { count: "exact", head: true });
	if (usersError) throw usersError;

	const { count: totalProducts, error: productsError } = await supabase.from("products").select("id", { count: "exact", head: true });
	if (productsError) throw productsError;

	const { count: totalSales, error: salesError } = await supabase.from("orders").select("id", { count: "exact", head: true });
	if (salesError) throw salesError;

	const { data: revenueData, error: revenueError } = await supabase
		.from("orders")
		.select("total_amount");
	if (revenueError) throw revenueError;

	const totalRevenue = revenueData.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

	return {
		users: totalUsers || 0,
		products: totalProducts || 0,
		totalSales: totalSales || 0,
		totalRevenue,
	};
};

export const getDailySalesData = async (startDate, endDate) => {
	try {
		const { data, error } = await supabase
			.from("orders")
			.select("created_at, total_amount")
			.gte("created_at", startDate.toISOString())
			.lte("created_at", endDate.toISOString());

		if (error) throw error;

		const dateArray = getDatesInRange(startDate, endDate);

		const grouped = dateArray.map((date) => ({
			date,
			sales: 0,
			revenue: 0,
		}));

		for (const order of data) {
			const orderDate = new Date(order.created_at).toISOString().split("T")[0];
			const group = grouped.find((item) => item.date === orderDate);
			if (group) {
				group.sales += 1;
				group.revenue += Number(order.total_amount || 0);
			}
		}

		return grouped;
	} catch (error) {
		throw error;
	}
};

function getDatesInRange(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}
