const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const account = new Schema({
  name: { type: String },
  type: { type: String },
  country: { type: String },
  description: { type: String },
  weblink: { type: String },
  image: { type: String },
  addresses: { type: Array },
  etherBalance: { type: Number },
  bitcoinBalance: { type: Number },
  active: { type: Boolean, default: true },
});

account.index({ name: 1 }, { unique: true });

const Account = mongoose.model("Account", account);

module.exports = Account;
