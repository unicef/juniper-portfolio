require("dotenv").config({ path: "../.env" });
const Juniper = require("..");
const config = require("../config");

(async () => {
  const juniper = new Juniper(config);
  const history = require("./pricehistory.json");

  async function savePrices() {
    history.forEach(async (price) => {
      const timestamp = new Date(price.date);
      const day = timestamp.getDate();
      const month = timestamp.getMonth();
      const year = timestamp.getFullYear();

      const p = {
        currency: price.currency === "BTC" ? "Bitcoin" : "Ethereum",
        symbol: price.currency === "BTC" ? "BTC" : "ETH",
        average: price.averagePrice,
        coinbase: price.priceCoinbasePro,
        binance: price.priceBinance,
        bitstamp: price.priceBitstamp,
        timestamp,
        day,
        month,
        year,
      };

      try {
        await juniper.savePrice(p);
      } catch (e) {
        console.log(e);
      }
    });
  }

  await savePrices();
  setTimeout(() => {
    juniper.exit();
  }, 1000); //hack!
})();
