const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activity = new Schema({
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
  multisigOwners: { type: Array, default: [] },
  txs: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

activity.index({ address: 1 }, { unique: true });

const Activity = mongoose.model("Activity", activity);

module.exports = Activity;
