const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wallet = new Schema({
  name: { type: String },
  type: { type: String },
  country: { type: String },
  description: { type: String },
  weblink: { type: String },
  active: { type: Boolean, default: true },
});

wallet.index({ address: 1 }, { unique: true });

const Wallet = mongoose.model("Wallet", wallet);

module.exports = Wallet;
