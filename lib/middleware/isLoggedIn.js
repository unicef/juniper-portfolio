const { Logger } = require("node-core-utils");

function isLoggedIn(req, res, next) {
  const logger = new Logger("logRequest");
  try {
    if (req.session.passport.user.profile) {
      return next();
    }
  } catch (e) {
    logger.error(`User is not logged in`);
    return res.status(500).send();
  }
  logger.error(`User profile is not in session`);
  return res.status(401).send();
}

module.exports = { isLoggedIn };
