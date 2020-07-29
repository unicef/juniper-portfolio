function isLoggedIn(req, res, next) {
  try {
    if (req.session.passport.user.profile) {
      return next();
    }
  } catch (e) {
    return res.status(500).send();
  }

  return res.status(401).send();
}

module.exports = { isLoggedIn };
