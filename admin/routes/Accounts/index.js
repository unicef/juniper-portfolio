const router = require("express").Router();
const Logger = require("../../logger");
const logger = new Logger("Account Routes");

router.get("/", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");

  let accounts;
  try {
    accounts = await juniperAdmin.getAccounts();
  } catch (e) {
    return res.status(500).send();
  }
  res.send(accounts);
});

router.post("/", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");

  const { account } = req.body;
  try {
    await juniperAdmin.createAccount(account);
  } catch (e) {
    return res.status(500).send();
  }
  res.send();
});

module.exports = router;
