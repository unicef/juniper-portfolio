const { Logger } = require("node-core-utils");

function isAdmin(req, res, next) {
  const logger = new Logger("isAdmin");
  const { isAdmin } = req.session.passport.user.profile;

  if (!isAdmin) {
    return res.status(403).send();
  }
  return next();
}

module.exports = {
  isAdmin,
};
