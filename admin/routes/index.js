const publicRoutes = require("./public");
const privateRoutes = require("./private");

module.exports = function () {
  return {
    publicRoutes,
    privateRoutes,
  };
};
