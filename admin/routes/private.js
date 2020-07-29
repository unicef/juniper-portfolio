const router = require("express").Router();
const Logger = require("../logger");
const logger = new Logger("Private Routes");

router.get("/ping", (req, res) => {
  res.send("pong");
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
