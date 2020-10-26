const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wallet = new Schema({
  address: { type: String, index: true, unique: true },
  name: { type: String },
  tags: { type: Array, default: [] },
  currency: { type: String },
  symbol: { type: String },
  balance: { type: Number, default: 0 },
  fees: { type: Number, default: 0 },
  feesUSD: { type: Number, default: 0 },
  isUnicef: { type: Boolean, default: false },
  isMultisig: { type: Boolean, default: false },
  isTracked: { type: Boolean, default: false },
  isTrackedOther: { type: Boolean, default: false },
  isAccount: { type: Boolean, default: false },
  multisigOwners: { type: Array, default: [] },
  txs: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

wallet.index({ address: 1 }, { unique: true });

const Wallet = mongoose.model("Wallet", wallet);

module.exports = Wallet;
