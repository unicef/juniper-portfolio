const router = require("express").Router();
const Logger = require("../../logger");
const logger = new Logger("Settings Routes");

router.get("/activities", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let activities = [];
  try {
    activities = await juniperAdmin.db.getActivities();
  } catch (e) {
    this.logger.error(e);
    return res.status(500).send();
  }

  res.json(activities);
});

router.put("/user", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { user } = req.body;

  try {
    await juniperAdmin.updateUser(user);
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  req.session.passport.user.profile = user;

  res.send();
});

module.exports = router;
