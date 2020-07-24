const router = require("express").Router();
const Logger = require("../logger");
const logger = new Logger("Private Routes");

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.get("/transactions/address/:address", async (req, res) => {
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
    wallets = await juniperAdmin.db.getUnicefWallets();
  } catch (e) {
    return logger.error(e);
  }
  res.json(wallets);
});

router.get("/wallets/tracked", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let wallets = [];

  try {
    wallets = await juniperAdmin.db.getTrackedWallets();
  } catch (e) {
    return logger.error(e);
  }
  res.json(wallets);
});
router.get("/wallets/summary", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let summary = {};

  try {
    summary = await juniperAdmin.getWalletSummary();
  } catch (e) {
    return logger.error(e);
  }
  res.json(summary);
});

router.get("/transactions", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let txs = [];

  try {
    txs = await juniperAdmin.db.getTransactions();
  } catch (e) {
    return logger.error(e);
  }

  res.json(txs);
});
router.get("/transactions/unpublished", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let txs = [];

  try {
    txs = await juniperAdmin.db.getUnpublishedTransactions();
  } catch (e) {
    return logger.error(e);
  }

  res.json(txs);
});

router.post("/transaction/archive", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let { txid } = req.body;

  try {
    await juniperAdmin.db.archiveTx(txid);
  } catch (e) {
    return logger.error(e);
  }

  res.send(true);
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

router.get("/wallet/untrack/:address", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { address } = req.params;

  try {
    await juniperAdmin.db.untrackWallet(address);
  } catch (e) {
    return logger.error(e);
  }

  res.send();
});

router.post("/wallet", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { wallet } = req.body;
  const { isUnicef } = wallet;
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

router.get("/startups", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let startups = [];

  try {
    startups = await juniperAdmin.db.getStartups();
  } catch (e) {
    return logger.error(e);
  }
  res.json(startups);
});

router.post("/startup", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { startup } = req.body;

  try {
    await juniperAdmin.db.createStartup(startup);
  } catch (e) {
    logger.error(e);
    return res.error({
      msg: "Failed to create startup",
    });
  }
  res.send(startup);
});

router.get("/donors", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let donors = [];

  try {
    donors = await juniperAdmin.db.getDonors();
  } catch (e) {
    return logger.error(e);
  }
  res.json(donors);
});

router.post("/donor", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { donor } = req.body;

  try {
    await juniperAdmin.db.createDonor(donor);
  } catch (e) {
    logger.error(e);
    return res.error({
      msg: "Failed to create donor",
    });
  }
  res.send(donor);
});

router.get("/natcoms", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let natcoms = [];

  try {
    natcoms = await juniperAdmin.db.getNatcoms();
  } catch (e) {
    return logger.error(e);
  }
  res.json(natcoms);
});

router.post("/natcom", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { natcom } = req.body;

  try {
    await juniperAdmin.db.createNatcom(natcom);
  } catch (e) {
    logger.error(e);
    return res.error({
      msg: "Failed to create natcom",
    });
  }
  res.send(natcom);
});

router.get("/prices", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { params } = req.body;
  let prices = [];

  try {
    prices = await juniperAdmin.db.getPrices(
      params.symbol,
      params.timeStart,
      params.timeEnd
    );
  } catch (e) {
    return logger.error(e);
  }
  res.json(prices);
});

module.exports = router;
