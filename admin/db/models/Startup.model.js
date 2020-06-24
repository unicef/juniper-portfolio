const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const startup = new Schema({
  name: { type: String },
  country: { type: String },
  tagline: {type: String },
  link: { type: String },
  amount: { type: Number, default: 0 },
  currency: { type: String, default: "ETHER" },
  shortcurrency: { type: String, default: "ETH" },
  investmentdate: {type: Date, default: Date.now},
  imageurl: { type: String },
  walletaddres: {type: String},
});

const Startup = mongoose.model("Startup", startup);

module.exports = Startup;


/*const prescrypto = {
    name: "Prescrypto",
    country: "Mexico",
    tagline: "Making sensitive clinical data portable, safe, and private",
    link: "www.prescrypto.com",
    amount: 50,
    currency: "ETHER",
    shortcurrency: "ETH",
    investmentdate: 'March 29, 2020',
    imageurl: "https://cdn.pixabay.com/photo/2020/05/09/09/13/house-5148865__340.jpg",
    walletaddress: '0x89205A3A3b2A69De6Dbf7f01ED12B2108B2c43e7'

  }*/