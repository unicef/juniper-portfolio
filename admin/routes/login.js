const router = require("express").Router();

router.post("/", async (req, res) => {
  if (req.session.profile) {
    req.session.isLoggedIn = true;

    return res.json(req.session.profile);
  }
  res.status(401).send();
});

module.exports = router;
