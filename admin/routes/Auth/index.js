const router = require("express").Router();
const { Logger } = require("node-code-utils");
const logger = new Logger("Auth Routes");

router.post("/login", async (req, res) => {
  try {
    if (req.session.passport.user.profile) {
      logger.info(`Login ${req.session.passport.user.profile.email}`);
      return res.json(req.session.passport.user.profile);
    }
  } catch (e) {
    return res.status(500).send();
  }
  return res.status(401).send();
});

module.exports = router;
