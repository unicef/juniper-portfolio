const accountRoutes = require("./Accounts");
const authRoutes = require("./Auth");
const publicRoutes = require("./public");
const privateRoutes = require("./private");
const priceRoutes = require("./Prices");
const settingRoutes = require("./Settings");
const transactionRoutes = require("./Transactions");
const walletRoutes = require("./Wallets");
const contentfulRoutes = require("./Contentful");

module.exports = {
  accountRoutes,
  authRoutes,
  publicRoutes,
  privateRoutes,
  priceRoutes,
  settingRoutes,
  transactionRoutes,
  walletRoutes,
  contentfulRoutes
};
