const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donor = new Schema({
  name: { type: String },
  amtETH: { type: Number, default: 0},
  amtBTC: {type: Number, default: 0 },
  walletaddress: {type: String},
});

const Donor = mongoose.model("Donor", donor);

module.exports = Donor;
