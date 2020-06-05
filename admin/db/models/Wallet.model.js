const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wallet = new Schema({
  address: { type: String, index: true },
  name: { type: String },
  tags: { type: Array, default: [] },
  currency: { type: String },
  symbol: { type: String },
  amount: { type: Number, default: 0 },
  amountUSD: { type: Number, default: 0 },
  isMultisig: { type: Boolean, default: false },
  multisigOwners: { type: Array, default: [] },
  active: { type: Boolean, default: true },
});

wallet.index({ address: 1 }, { unique: true });

const Wallet = mongoose.model("Wallet", wallet);

module.exports = Wallet;
