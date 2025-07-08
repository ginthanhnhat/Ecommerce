import React from 'react';

const DashboardStats = ({ stats }) => {
  const { totalUsers, totalProducts, totalOrders } = stats;

  const cards = [
    { label: 'Users', value: totalUsers, color: 'bg-blue-500' },
    { label: 'Products', value: totalProducts, color: 'bg-green-500' },
    { label: 'Orders', value: totalOrders, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white rounded-2xl p-6 shadow-md`}
        >
          <div className="text-xl font-semibold">{card.label}</div>
          <div className="text-3xl font-bold mt-2">{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
