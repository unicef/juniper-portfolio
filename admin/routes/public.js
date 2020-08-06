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

module.exports = router;
