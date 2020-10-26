const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const price = new Schema({
  currency: { type: String },
  symbol: { type: String, index: true },
  average: { type: Number },
  coinbase: { type: Number },
  binance: { type: Number },
  bitstamp: { type: Number },
  timestamp: { type: Date, index: true },
  day: { type: Number },
  month: { type: Number },
  year: { type: Number },
});

price.index({ timestamp: 1, symbol: 1 }, { unique: true });

const Price = mongoose.model("Price", price);

module.exports = Price;
