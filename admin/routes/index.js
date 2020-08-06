const accountRoutes = require("./Accounts");
const authRoutes = require("./Auth");
const publicRoutes = require("./public");
const privateRoutes = require("./private");
const settingRoutes = require("./Settings");
const transactionRoutes = require("./Transactions");
const walletRoutes = require("./Wallets");

module.exports = {
  accountRoutes,
  authRoutes,
  publicRoutes,
  privateRoutes,
  settingRoutes,
  transactionRoutes,
  walletRoutes,
};
