const publicRoutes = require("./public");
const privateRoutes = require("./private");
const loginRoutes = require("./login");
const settingRoutes = require("./Settings");

module.exports = function () {
  return {
    publicRoutes,
    privateRoutes,
    loginRoutes,
    settingRoutes,
  };
};
