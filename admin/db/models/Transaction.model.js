const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transaction = new Schema({
  txid: { type: String },
  address: { type: String },
  currency: { type: String },
  symbol: { type: String },
  source: { type: String },
  destination: { type: String },
  inputs: { type: Array, default: [] },
  outputs: { type: Array, default: [] },
  to: { type: String },
  from: { type: String },
  block: { type: Number, default: -1 },
  timestamp: { type: Date },
  index: { type: Number },
  sent: { type: Boolean, default: false },
  received: { type: Boolean, default: false },
  rate: { type: Number },
  fee: { type: Number },
  feeUSD: { type: Number },
  amount: { type: Number },
  amountUSD: { type: Number },
  donor: { type: String },
  donorTxid: { type: String },
  isUnicef: { type: Boolean, default: false },
  isMultisigOwner: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
});

transaction.index({ txid: 1, index: 1 }, { unique: true });
transaction.index({ address: 1 });

const Transaction = mongoose.model("Transaction", transaction);

module.exports = Transaction;
