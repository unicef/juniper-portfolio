const logRequest = require("./logRequest");
const { s3Upload, s3Download } = require("./S3");

module.exports = {
  logRequest,
  s3Upload,
  s3Download,
};
