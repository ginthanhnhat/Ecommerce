import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { assets } from '../assets/assets'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042', '#8dd1e1', '#a4de6c', '#d0ed57'];

const DashboardInsights = ({ topProducts, categoryData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Products */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
        <ul className="space-y-3">
          {topProducts.map((product, i) => (
            <li
              key={i}
              className="flex items-center justify-between border-b pb-2 gap-2"
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-12 h-12 object-cover rounded"
                  src={
                    product.images?.[0]?.hi_res ||
                    product.images?.[0]?.large ||
                    product.images?.[0]?.thumb ||
                    assets.no_img
                  }
                  alt={product.title}
                />
                <span className="text-sm font-medium">{product.title}</span>
              </div>
              <span className="text-sm font-bold">{product.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Category Distribution Pie Chart */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardInsights;
