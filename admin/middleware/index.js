const { devMode } = require("./devMode");
const { logRequest } = require("./logRequest");
const { isAdmin } = require("./isAdmin");
const { isLoggedIn } = require("./isLoggedIn");
const { s3Upload, s3Download } = require("./S3");

module.exports = {
  devMode,
  logRequest,
  isLoggedIn,
  isAdmin,
  s3Upload,
  s3Download,
};
