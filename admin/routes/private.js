const router = require("express").Router();
const Logger = require("../logger");
const logger = new Logger("Private Routes");

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.get("/activities", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let activities = [];
  try {
    activities = await juniperAdmin.db.getActivities();
  } catch (e) {
    this.logger.error(e);
    return res.status(500).send();
  }

  res.json(activities);
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
    logger.error(e);
    return res.status(500).send();
  }
  res.json(wallets);
});

router.get("/wallets/tracked", async (req, res) => {
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
router.get("/wallets/summary", async (req, res) => {
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

router.get("/transactions", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let txs = [];

  try {
    txs = await juniperAdmin.db.getTransactions();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.json(txs);
});
router.get("/transactions/unpublished", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let txs = [];

  try {
    txs = await juniperAdmin.db.getUnpublishedTransactions();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.json(txs);
});

router.post("/transaction/archive", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let { txid } = req.body;

  try {
    const profile = req.session.passport.user.profile;
    const name = `${profile.firstName} ${profile.lastName}`;
    await juniperAdmin.db.archiveTx(txid);
    await juniperAdmin.logActivity({
      name: name,
      text: `<a href="#" class="link">${name}</a> archived a transaction.`,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
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
    logger.error(e);
    return res.status(500).send();
  }

  res.json(wallet);
});

router.get("/wallet/untrack/:address", async (req, res) => {
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

router.post("/wallet", async (req, res) => {
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

router.put("/user", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { user } = req.body;

  try {
    await juniperAdmin.updateUser(user);
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  req.session.passport.user.profile = user;

  res.send();
});

router.get("/startups", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let startups = [];

  try {
    startups = await juniperAdmin.db.getStartups();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
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
    logger.error(e);
    return res.status(500).send();
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
    logger.error(e);
    return res.status(500).send();
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
  const params = req.query;
  let prices = [];

  try {
    prices = await juniperAdmin.db.getPrices(
      params.symbol,
      params.timeStart,
      params.timeEnd
    );
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }
  res.json(prices);
});

router.get("/avgprice", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const params = req.query;
  let avgprice = [];
  const timeStart = new Date(params.timeStart);
  const timeEnd = new Date(params.timeEnd);

  try {
    avgprice = await juniperAdmin.db.averagePriceInDateRange(
      params.symbol,
      timeStart,
      timeEnd
    );
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }
  res.json(avgprice);
});

module.exports = router;
