const router = require("express").Router();
const Logger = require("../../logger");
const logger = new Logger("Price Routes");

router.get("/", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");
  let bitcoin = [];
  let ethereum = [];

  let btcPrice = 0;
  let ethPrice = 0;

  try {
    logger.info("Getting BTC Prices");
    btcPrice = await juniperAdmin.priceMonitor.getPrice("BTC");
    bitcoin = await juniperAdmin.db.getPrices("BTC");

    logger.info("Getting ETH Prices");
    ethPrice = await juniperAdmin.priceMonitor.getPrice("ETH");
    ethereum = await juniperAdmin.db.getPrices("ETH");
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }
  res.json({
    btcPrice,
    ethPrice,
    bitcoin,
    ethereum,
  });
});

module.exports = router;
