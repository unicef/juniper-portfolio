const router = require("express").Router();
const Logger = require("../logger");
const logger = new Logger("Private Routes");

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.get("/transactions/:address", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { address } = req.params;
  let transactions = [];

  try {
    transactions = await juniperAdmin.db.getTransactionsForAddress(address);
  } catch (e) {
    return logger.error(e);
  }
  res.json(transactions);
});

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
router.get("/wallets/summary", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let ethSent, ethReceived, btcSent, btcReceived;

  try {
    ethSent = await juniperAdmin.db.getTotalSentForCurrency("ETH");
    ethReceived = await juniperAdmin.db.getTotalReceivedForCurrency("ETH");
    btcSent = await juniperAdmin.db.getTotalSentForCurrency("BTC");
    btcReceived = await juniperAdmin.db.getTotalReceivedForCurrency("BTC");
  } catch (e) {
    return logger.error(e);
  }
  res.json({ ethSent, ethReceived, btcSent, btcReceived });
});

router.get("/wallet/:address", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { address } = req.params;
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
    // TODO cleanup validation
    if (!wallet.address) {
      throw new Error(
        "Failed to create wallet. Wallet does not contain an address"
      );
    }

    await juniperAdmin.db.createWallet(wallet);

    switch (wallet.symbol) {
      case "BTC":
        await juniperAdmin.bitcoinWalletScraper.scrapeTransactionData(
          wallet.address
        );
        break;
      case "ETH":
        await juniperAdmin.ethereumWalletScraper.scrapeTransactionData(
          wallet.address
        );

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
