const publicRoutes = require("./public");
const privateRoutes = require("./private");
const loginRoutes = require("./login");
const settingRoutes = require("./Settings");
const walletRoutes = require("./Wallets");

module.exports = function () {
  return {
    publicRoutes,
    privateRoutes,
    loginRoutes,
    settingRoutes,
    walletRoutes,
  };
};
