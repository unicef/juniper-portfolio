const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    if (req.session.passport.user.profile) {
      return res.json(req.session.passport.user.profile);
    }
  } catch (e) {
    res.status(401).send();
  }
});

module.exports = router;