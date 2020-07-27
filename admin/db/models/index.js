const Wallet = require("./Wallet.model.js");
const Startup = require("./Startup.model.js");
const Donor = require("./Donor.model.js");
const Natcom = require("./Natcom.model.js");
const Transaction = require("./Transaction.model.js");
const Price = require("./Price.model.js");
const Activity = require("./Activity.model.js");

module.exports = {
  Activity,
  Wallet,
  Transaction,
  Price,
  Startup,
  Donor,
  Natcom,
};
