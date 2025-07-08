import React, { useEffect, useState } from 'react';
import DashboardStats from '../components/DashboardStats';
import DashboardCharts from '../components/DashboardCharts';
import DashboardInsights from '../components/DashboardInsights';
import axios from 'axios'
import { backendUrl, currency } from '../App'
const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
  const [ordersData, setOrdersData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(backendUrl + '/api/admin/dashboard');
        const data = res.data;
        setStats(data.stats);
        setOrdersData(data.ordersChart);
        setSalesData(data.salesChart);
        setTopProducts(data.topProducts);
        setTopCountries(data.topCountries);
        setCategoryData(data.categoryData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="p-4">
      <DashboardStats stats={stats} />
      <DashboardCharts ordersData={ordersData} salesData={salesData} />
      <DashboardInsights topProducts={topProducts} topCountries={topCountries} categoryData={categoryData}/>
    </div>
  );
};

export default Dashboard;
