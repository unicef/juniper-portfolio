const { Logger } = require("node-core-utils");

function logRequest(req, res, next) {
  const logger = new Logger("logRequest");

  logger.info(`${req.method} ${req.originalUrl}`);

  logger.debug(req.body);
  logger.debug(req.session);
  logger.debug(req.params);
  logger.debug(req.query);

  return next();
}

module.exports = {
  logRequest,
};
