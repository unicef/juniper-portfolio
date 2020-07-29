const router = require("express").Router();

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.get("/isLoggedIn", async (req, res) => {
  try {
    if (req.session.passport.user.profile) {
      return res.json(req.session.passport.user.profile);
    }
  } catch (e) {
    res.status(401).send();
  }
});

module.exports = router;
