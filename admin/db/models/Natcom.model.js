const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const natcom = new Schema({
  name: { type: String },
  amtETH: { type: Number, default: 0},
  amtBTC: {type: Number, default: 0 },
  walletaddress: {type: String},
});

const Natcom = mongoose.model("Natcom", natcom);

module.exports = Natcom;
