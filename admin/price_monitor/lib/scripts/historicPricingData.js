const fetch = require("node-fetch");
const DB = require("../../../db");
const config = require("../config");
const db = new DB(config.db);
const btcEndpoint =
  "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=2000";
const ethEndpoint =
  "https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=2000";

async function scrape(url, exchange, currency, symbol, ticker) {
  let data, json;
  try {
    data = await fetch(url);
    json = await data.json();
  } catch (e) {}

  json.Data.Data.forEach(async (price) => {
    try {
      await db.savePrice({
        exchange: exchange,
        currency: currency,
        symbol: symbol,
        ticker: ticker,
        price: (price.high + price.low) / 2,
        timestamp: new Date(price.time * 1000),
      });
    } catch (e) {
      console.log(e);
    }
  });
}

console.log(db);

scrape(btcEndpoint, "CryptoCompare", "Bitcoin", "BTC", "BTC-USD");
scrape(ethEndpoint, "CryptoCompare", "Ethereum", "ETH", "ETH-USD");
