const router = require("express").Router();
const { isAdmin } = require("../../middleware");
const { Logger } = require("node-core-utils");
const logger = new Logger("Account Routes");

router.get("/", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");

  let accounts;
  try {
    accounts = await juniperAdmin.getAccounts();
  } catch (e) {
    return res.status(500).send();
  }
  console.log(accounts.length);
  res.send(accounts);
});

router.get("/:name", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { name } = req.params;

  let account;
  try {
    account = await juniperAdmin.getAccount(name);
  } catch (e) {
    return res.status(500).send();
  }

  res.send(account);
});

router.post("/", isAdmin, async (req, res) => {
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
