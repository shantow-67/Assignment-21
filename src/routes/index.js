const salesRoute = require("./salesRoute");

const route = require("express").Router();

// health check
route.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

route.use("/api/v1/sales", salesRoute);
module.exports = route;
