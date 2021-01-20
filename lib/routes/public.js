const router = require("express").Router();

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.send();
  });
});

router.post("/password/reset", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const host = req.get("host");
  const { email } = req.body;

  juniperAdmin.sendResetPassword(email, host);

  res.send();
});

router.get("/settings/app", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");

  let settings = {};

  try {
    settings = await juniperAdmin.getAppSettings();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.json(settings);
});

router.get("/isLoggedIn", async (req, res) => {
  try {
    if (
      req.session.passport &&
      req.session.passport.user &&
      req.session.passport.user.profile
    ) {
      return res.json(req.session.passport.user.profile);
    }
  } catch (e) {
    return res.status(500).send();
  }
  return res.status(401).send();
});

router.get("/verification/:verification", async (req, res) => {
  const { verification } = req.params;
  const juniperAdmin = req.app.get("juniperAdmin");

  let isValidVerification;
  try {
    isValidVerification = await juniperAdmin.isValidVerificationCode(
      verification
    );
  } catch (e) {
    return res.status(500).send();
  }
  if (isValidVerification) {
    return res.send();
  } else {
    return res.status(401).send();
  }
});

router.post("/verification", async (req, res) => {
  const { verificationCode, newPassword } = req.body;
  const juniperAdmin = req.app.get("juniperAdmin");

  let user;
  try {
    user = await juniperAdmin.getUserByVerificationCode(verificationCode);
    user.password = newPassword;
    user.isVerified = true;
    await juniperAdmin.createUser(user);
  } catch (e) {
    return res.status(500).send();
  }

  res.send();
});

module.exports = router;
