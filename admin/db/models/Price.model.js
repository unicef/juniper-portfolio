const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const price = new Schema({
  exchange: { type: String, index: true },
  currency: { type: String },
  symbol: { type: String, index: true },
  ticker: { type: String },
  price: { type: Number },
  timestamp: { type: Date, index: true },
  day: { type: Number },
  month: { type: Number },
  year: { type: Number },
});

price.index({ exchange: 1, timestamp: 1, symbol: 1 }, { unique: true });

const Price = mongoose.model("Price", price);

module.exports = Price;
