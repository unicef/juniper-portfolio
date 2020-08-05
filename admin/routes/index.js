const publicRoutes = require("./public");
const privateRoutes = require("./private");
const authRoutes = require("./Auth");
const settingRoutes = require("./Settings");
const walletRoutes = require("./Wallets");
const transactionRoutes = require("./Transactions");

module.exports = function () {
  return {
    publicRoutes,
    privateRoutes,
    authRoutes,
    settingRoutes,
    walletRoutes,
    transactionRoutes,
  };
};
