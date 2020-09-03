const router = require("express").Router();
const Logger = require("../../logger");
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

router.post("/", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { wallet } = req.body;
  const { isUnicef } = wallet;
  const user = "Alex Sherbuck"; // Todo, get from session

  logger.info(`/wallet ${JSON.stringify(wallet)}`);
  try {
    // TODO cleanup validation
    if (!wallet.address) {
      throw new Error(
        "Failed to create wallet. Wallet does not contain an address"
      );
    }

    await juniperAdmin.createWallet(wallet);

    if (wallet.isUnicef) {
      await juniperAdmin.logActivity({
        name: user,
        text: `<a href="#" class="link">${user}</a> added a new wallet.`,
      });
    } else if (wallet.isTracked) {
      await juniperAdmin.logActivity({
        name: user,
        text: `<a href="#" class="link">${user}</a> tracked a wallet.`,
      });
    }

    switch (wallet.symbol) {
      case "BTC":
        await juniperAdmin.bitcoinWalletScraper.scrapeTransactionData(
          wallet.address,
          isUnicef,
          wallet.multisigOwners
        );
        break;
      case "ETH":
        await juniperAdmin.ethereumWalletScraper.scrapeTransactionData(
          wallet.address,
          isUnicef,
          wallet.multisigOwners
        );

        if (wallet.isMultisig) {
          juniperAdmin.gnosisWalletScraper.setAddress(wallet.address);
          await juniperAdmin.gnosisWalletScraper.scrapeAuthRecords();
        }

        break;
      default:
        throw new Error(
          "Failed to create wallet. Wallet does not contain a valid symbol"
        );
    }
  } catch (e) {
    logger.error(e);
    return res.status(404).send({
      msg: "Failed to create wallet",
    });
  }

  res.send(wallet);
});

module.exports = router;
