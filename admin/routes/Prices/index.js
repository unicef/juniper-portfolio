const router = require("express").Router();
const Logger = require("../../logger");
const logger = new Logger("Price Routes");

router.get("/", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let bitcoin = [];
  let ethereum = [];

  try {
    logger.info("Getting BTC Prices");
    bitcoin = await juniperAdmin.db.getPrices("BTC");
    logger.info("Getting ETH Prices");
    ethereum = await juniperAdmin.db.getPrices("ETH");
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }
  res.json({
    bitcoin,
    ethereum,
  });
});

module.exports = router;
