const Logger = require("../logger");

function logRequest(req, res, next) {
  const logger = new Logger("logRequest");

  logger.info(`${req.method} ${req.originalUrl}`);

  logger.debug(req.body);
  logger.debug(req.params);
  logger.debug(req.query);
  return next();
}

function isLoggedIn(req, res, next) {
  try {
    if (req.session.passport.user.profile) {
      return next();
    }
  } catch (e) {
    return res.status(401).send();
  }
}

module.exports = {
  logRequest,
  isLoggedIn,
};
