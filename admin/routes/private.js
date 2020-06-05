const router = require("express").Router();
const Logger = require("../logger");
const logger = new Logger("Private Routes");

router.get("/wallets", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let wallets = [];

  try {
    wallets = await juniperAdmin.db.getWallets();
  } catch (e) {
    return logger.error(e);
  }
  res.json(wallets);
});

router.get("/wallet/:address", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const address = req.params;
  let wallet = {};

  try {
    wallet = await juniperAdmin.db.getWallet(address);
  } catch (e) {
    return logger.error(e);
  }
  res.json(wallet);
});

router.post("/wallet", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { wallet } = req.body;

  try {
    await juniperAdmin.db.createWallet(wallet);
  } catch (e) {
    logger.error(e);
    return res.error({
      msg: "Failed to create wallet",
    });
  }
  res.send(wallet);
});

module.exports = router;
