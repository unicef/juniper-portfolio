const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const account = new Schema({
  name: { type: String },
  type: { type: String },
  country: { type: String },
  description: { type: String },
  weblink: { type: String },
  active: { type: Boolean, default: true },
});

account.index({ address: 1 }, { unique: true });

const Account = mongoose.model("Account", account);

module.exports = Account;
