const SalesModel = require("../models/SalesModel");

const createSales = async (req, res, next) => {
  try {
    const data = req.body;

    const sales = new SalesModel(data);
    const result = await sales.save();
    res.status(201).json({ message: "ok", data: result });
  } catch (error) {
    next(error);
  }
};

const totalSaleRevenue = async (req, res, next) => {
  try {
    const totalRevenue = await SalesModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    res.status(200).json({ data: totalRevenue });
  } catch (error) {
    next(error);
  }
};

const totalSelByProductId = async (req, res, next) => {
  try {
    const totalSaleByProductid = await SalesModel.aggregate([
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);

    res.status(200).json({ total_quantity_sold: totalSaleByProductid });
  } catch (error) {
    next(error);
  }
};

const salesTopProducts = async (req, res, next) => {
  try {
    const topProductSales = await SalesModel.aggregate([
      {
        $group: {
          _id: "$product",
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    res.status(200).json({ topProductSales });
  } catch (error) {
    next(error);
  }
};

const saleAvaragePrice = async (req, res, next) => {
  try {
    const saleAvgPrice = await SalesModel.aggregate([
      {
        $group: {
          _id: null,
          avaragePrice: { $avg: "$price" },
        },
      },
    ]);

    res.status(200).json({ saleAvgPrice });
  } catch (error) {
    next(error);
  }
};

const salesRevenueByMonth = async (req, res, next) => {
  try {
    const revenueByMonth = await SalesModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    res.status(200).json({ revenueByMonth });
  } catch (error) {
    next(error);
  }
};

const highestQuantitySold = async (req, res, next) => {
  try {
    const highestQtySold = await SalesModel.aggregate([
      {
        $group: {
          _id: "$product",
          maxQuantity: { $max: "$quantity" },
        },
      },
      {
        $sort: { maxQuantity: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    res.status(200).json({ highestQtySold });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSales,
  totalSaleRevenue,
  totalSelByProductId,
  salesTopProducts,
  saleAvaragePrice,
  salesRevenueByMonth,
  highestQuantitySold,
};
