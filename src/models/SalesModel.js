const { Schema, model } = require("mongoose");

const dataModel = Schema(
  {
    product: String,
    quantity: Number,
    price: Number,
    date: {
      type: Date,
      default: new Date().toISOString(),
    },
  },
  { versionKey: false }
);

const SalesModel = model("Sales", dataModel);

module.exports = SalesModel;
