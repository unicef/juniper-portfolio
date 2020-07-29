const publicRoutes = require("./public");
const privateRoutes = require("./private");
const loginRoutes = require("./login");

module.exports = function () {
  return {
    publicRoutes,
    privateRoutes,
    loginRoutes,
  };
};
