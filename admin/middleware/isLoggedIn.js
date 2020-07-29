function isLoggedIn(req, res, next) {
  console.log("here");
  try {
    console.log("here2");
    if (req.session.passport.user.profile) {
      console.log("here 3");
      return next();
    } else {
      console.log("here4");
      return res.status(401).send();
    }
  } catch (e) {
    console.log("here 5");
    return res.status(500).send();
  }
  console.log("here 6");
  return res.status(401).send();
}

module.exports = { isLoggedIn };
