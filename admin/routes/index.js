const publicRoutes = require("./public");
const privateRoutes = require("./private");
const loginRoutes = require("./login");
const settingRoutes = require("./Settings");
const walletRoutes = require("./Wallets");
const transactionRoutes = require("./Transactions");

module.exports = function () {
  return {
    publicRoutes,
    privateRoutes,
    loginRoutes,
    settingRoutes,
    walletRoutes,
    transactionRoutes,
  };
};
