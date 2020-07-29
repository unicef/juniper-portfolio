const router = require("express").Router();

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.post("/login", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let { email, password } = req.body;
  let user;

  try {
    user = await juniperAdmin.login({ email, password });
  } catch (e) {
    return logger.error(e);
  }

  if (!user) {
    res.status(403).send();
  } else {
    res.send(user);
  }
});

module.exports = router;
