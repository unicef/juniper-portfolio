const router = require("express").Router();

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.send();
  });
});

router.get("/isLoggedIn", async (req, res) => {
  try {
    if (req.session.passport.user.profile) {
      return res.json(req.session.passport.user.profile);
    }
  } catch (e) {
    return res.status(500).send();
  }
  return res.status(401).send();
});

module.exports = router;
