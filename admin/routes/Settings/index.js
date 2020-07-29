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

router.get("/users", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let users = [];
  try {
    users = await juniperAdmin.db.getUsers();
  } catch (e) {
    this.logger.error(e);
    return res.status(500).send();
  }
  res.send(users);
});

router.post("/user/invite", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { user } = req.body;

  const verificationCode = juniperAdmin.utils.createVerificationCode();
  console.log(verificationCode);

  user.verificationCode = verificationCode;
  user.isVerified = false;
  user.active = true;

  try {
    await juniperAdmin.inviteUser(user);
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.send(user);
});

router.post("/user/remove", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { email } = req.body;

  try {
    await juniperAdmin.db.setUserInactive(email);
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.send(true);
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
