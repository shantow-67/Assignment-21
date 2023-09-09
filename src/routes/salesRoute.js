const salesController = require("../controllers/salesController");

const router = require("express").Router();

router.post("/createSales", salesController.createSales);
router.get("/total-revenue", salesController.totalSaleRevenue);
router.get("/quantity-by-product", salesController.totalSelByProductId);

router.get("/top-products", salesController.salesTopProducts);
router.get("/average-price", salesController.saleAvaragePrice);
router.get("/revenue-by-month", salesController.salesRevenueByMonth);
router.get("/highest-quantity-sold", salesController.highestQuantitySold);

module.exports = router;
