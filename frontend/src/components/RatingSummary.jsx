import React from 'react';

const RatingSummary = ({ ratings, totalRating }) => {
  const calculateAverage = () => {
    let totalScore = 0;
    let total = 0;
    for (let i = 1; i <= 5; i++) {
      const count = ratings[i] || 0;
      totalScore += i * count;
      total += count;
    }
    return total === 0 ? 0 : (totalScore / total).toFixed(1);
  };

  const average = calculateAverage();

  return (
    <div className="max-w-md w-full p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-1">Customer reviews</h2>
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-2xl font-semibold">{average}</span>
        <span className="text-yellow-500 text-xl">★</span>
        <span className="text-gray-600">out of 5</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">{totalRating.toLocaleString()} global reviews</p>

      {[5, 4, 3, 2, 1].map((star) => {
        const count = ratings[star] || 0;
        const percent = totalRating ? ((count / totalRating) * 100).toFixed(0) : 0;

        return (
          <div key={star} className="flex items-center space-x-2 mb-1">
            <span className="min-w-12 text-sm text-blue-600 hover:underline cursor-pointer">{star} star</span>
            <div className="w-full bg-gray-200 rounded h-3 relative">
              <div
                className="bg-orange-400 h-3 rounded"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="w-10 text-sm text-gray-600 text-right">{percent}%</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingSummary;
