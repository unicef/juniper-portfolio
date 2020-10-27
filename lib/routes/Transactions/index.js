const router = require("express").Router();
const { isAdmin } = require("../../middleware");
const { Logger } = require("node-core-utils");
const logger = new Logger("Transaction Routes");

router.get("/address/:address", async (req, res) => {
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

router.get("/", async (req, res) => {
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

router.get("/hq", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let txs = [];

  try {
    txs = await juniperAdmin.db.getHQTransactions();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.json(txs);
});
router.get("/unpublished", async (req, res) => {
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

router.post("/", isAdmin, async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");

  const { tx } = req.body;

  try {
    const profile = req.session.passport.user.profile;
    const name = `${profile.firstName} ${profile.lastName}`;
    await juniperAdmin.db.saveTransaction(tx);
    if (tx.publish) {
      await juniperAdmin.logActivity({
        name: name,
        text: `<a href="#" class="link">${name}</a> published a transaction.`,
      });
    }
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.send(true);
});
router.post("/archive", isAdmin, async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let { txid } = req.body;

  logger.info(`Archiving tx: ${txid}`);
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

router.get("/authrecord/:txid", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  const { txid } = req.params;
  let authRecords = [];

  try {
    authRecords = await juniperAdmin.getAuthRecords(txid);
  } catch (e) {
    return logger.error(e);
  }

  res.json(authRecords);
});

module.exports = router;
