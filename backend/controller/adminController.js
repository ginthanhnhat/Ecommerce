import userModel from "../models/userModel.js"
import productModel from "../models/productModel.js"
import orderModel from "../models/orderModel.js"

const dashboardData = async (req, res) => {
  try {
    // 1. Total data
    const totalUsers = await userModel.countDocuments();
    const totalProducts = await productModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();

    // 2. Order by day
    const recentOrders = await orderModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } }
          },
          orders: { $sum: 1 },
          sales: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 7 }
    ]);

    const ordersChart = recentOrders.map(item => ({
      date: item._id,
      orders: item.orders
    }));

    const salesChart = recentOrders.map(item => ({
      date: item._id,
      sales: item.sales
    }));

    // 3. Top product sale 
    const productSales = await orderModel.aggregate([
        { $unwind: "$items" },
        {
            $group: {
            _id: "$items.parent_asin",
            count: { $sum: "$items.quantity" }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
    ]);

    const topAsins = productSales.map(p => p._id);

    const productDetails = await productModel.find({
        parent_asin: { $in: topAsins }
        }).select("title images parent_asin");

    const topProducts = productSales.map(p => {
        const product = productDetails.find(prod => prod.parent_asin === p._id);
        return {
            title: product?.title || "Unknown",
            count: p.count,
            images: product?.images || []
        };
    });


    // 4. Top country 
    const countryStats = await orderModel.aggregate([
      {
        $group: {
          _id: "$address.country",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const topCountries = countryStats.map(c => ({
      name: c._id,
      count: c.count
    }));

    // 5. Tổng số lượng bán theo category
    const categorySales = await orderModel.aggregate([
        { $unwind: "$items" },
        { $unwind: "$items.main_category" },
        {
            $group: {
            _id: "$items.main_category",
            count: { $sum: "$items.quantity" }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 6 }
        ]);

        const categoryData = categorySales.map(c => ({
        category: c._id,
        count: c.count
    }));

    res.status(200).json({
      stats: {
        totalUsers,
        totalProducts,
        totalOrders
      },
      ordersChart,
      salesChart,
      topProducts,
      topCountries,
      categoryData
    });

  } catch (err) {
    console.error("Dashboard Data Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export { dashboardData };