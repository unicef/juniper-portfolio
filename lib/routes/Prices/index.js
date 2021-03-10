const router = require("express").Router();
const { Logger } = require("node-core-utils");
const logger = new Logger("Price Routes");

router.get("/", async (req, res) => {
  const juniperAdmin = req.app.get("juniperAdmin");

  let bitcoin = [];
  let ethereum = [];

  let btcPrice = 0;
  let ethPrice = 0;

  let prices = { bitcoin: [], ethereum: [] };

  try {
    prices = await juniperAdmin.getPrices();
  } catch (e) {
    logger.error(e);
    return res.status(500).send();
  }

  res.json(prices);
});

module.exports = router;
