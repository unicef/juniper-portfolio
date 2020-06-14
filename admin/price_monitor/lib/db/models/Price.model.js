const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const price = new Schema({
  exchange: { type: String, index: true },
  currency: { type: String },
  symbol: { type: String, index: true },
  ticker: { type: String },
  price: { type: Number },
  timestamp: { type: Date, index: true },
});

const Price = mongoose.model("Price", price);

module.exports = Price;
