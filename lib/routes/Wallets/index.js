const router = require("express").Router();
const { isAdmin } = require("../../middleware");
const { Logger } = require("node-core-utils");
const logger = new Logger("Wallet Routes");

router.get("/", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let wallets = [];

  try {
    wallets = await juniperAdmin.db.getUnicefWallets();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }
  res.json(wallets);
});

router.get("/updating", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");

  res.json({ updating: juniperAdmin.updatingWallets });
});

router.get("/tracked", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let wallets = [];

  try {
    wallets = await juniperAdmin.db.getTrackedWallets();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }
  res.json(wallets);
});
router.get("/summary", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let summary = {};

  try {
    summary = await juniperAdmin.getWalletSummary();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }
  res.json(summary);
});

router.get("/:address", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { address } = req.params;
  let wallet = {};

  try {
    wallet = await juniperAdmin.db.getWallet(address);
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.json(wallet);
});

router.get("/untrack/:address", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { address } = req.params;

  try {
    await juniperAdmin.db.untrackWallet(address);
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.send();
});

router.post("/track", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { wallet } = req.body;
  const { isUnicef } = wallet;
  const { firstName, lastName } = req.session.passport.user.profile;
  const user = `${firstName} ${lastName}`;

  logger.info(`/wallet ${JSON.stringify(wallet)}`);
  try {
    // TODO cleanup validation
    if (!wallet.address) {
      throw new Error(
        "Failed to create wallet. Wallet does not contain an address"
      );
    }

    const walletExists = await juniperAdmin.db.getWallet(wallet.address);

    if (!walletExists) {
      await juniperAdmin.createWallet(wallet);
    } else {
      return res.status(404).send({
        msg: "Wallet already exists",
      });
    }
  } catch (e) {
    logger.error(e);
    return res.status(404).send({
      msg: "Failed to create wallet",
    });
  }

  res.send(wallet);
});

router.post("/", isAdmin, async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { wallet } = req.body;
  const { isUnicef } = wallet;
  const { firstName, lastName } = req.session.passport.user.profile;
  const user = `${firstName} ${lastName}`;

  logger.info(`/wallet ${JSON.stringify(wallet)}`);
  try {
    // TODO cleanup validation
    if (!wallet.address) {
      throw new Error(
        "Failed to create wallet. Wallet does not contain an address"
      );
    }

    await juniperAdmin.createWallet(wallet);

    await juniperAdmin.logActivity({
      name: user,
      text: `<a href="#" class="link">${user}</a> added a new wallet.`,
    });
  } catch (e) {
    logger.error(e);
    return res.status(404).send({
      msg: "Failed to create wallet",
    });
  }

  res.send(wallet);
});

module.exports = router;
