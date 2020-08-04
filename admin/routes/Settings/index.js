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

  user.verificationCode = verificationCode;
  user.isVerified = false;
  user.active = true;

  let users;
  try {
    await juniperAdmin.inviteUser(user);
    users = await juniperAdmin.db.getUsers();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.send(users);
});

router.post("/user/remove", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { email } = req.body;
  let users = [];

  try {
    await juniperAdmin.db.setUserInactive(email);
    users = await juniperAdmin.db.getUsers();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.send(users);
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

router.put("/user/password", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { currentPassword, newPassword, newPassword2 } = req.body;
  const { email } = req.session.passport.user.profile;
  try {
    if (!juniperAdmin.validatePassword(newPassword, newPassword2)) {
      return res.status(400).send();
    }

    if (
      !(await juniperAdmin.changePassword(email, currentPassword, newPassword))
    ) {
      return res.status(401).send();
    }
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.send();
});

module.exports = router;
