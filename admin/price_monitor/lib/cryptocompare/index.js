const fetch = require("node-fetch");
const { Logger } = require("node-code-utils");

class CryptoCompare {
  // https://www.cryptocompare.com/media/27010937/cccagg_methodology_2018-02-26.pdf
  constructor(config, db) {
    this.config = config;
    this.db = db;
    this.logger = new Logger("CryptoCompare");

    this.logger.info("Started");
  }

  async getBTCPrices(limit) {
    this.logger.info(`Scraping the last ${limit} days of Bitcoin Prices`);
    const btcEndpoint = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=${limit}`;
    this.scrape(btcEndpoint, "Bitcoin", "BTC", "BTC-USD");
  }

  async getETHPrices(limit) {
    this.logger.info(`Scraping the last ${limit} days of Ethereum Prices`);
    const ethEndpoint = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=${limit}`;
    this.scrape(ethEndpoint, "Ethereum", "ETH", "ETH-USD");
  }

  async getPrice(symbol) {
    this.logger.info(`Getting price for ${symbol}`);
    let res, json;
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`;
    try {
      res = await fetch(url);
      json = await res.json();
    } catch (e) {
      logger.error(e);
    }
    return json.USD;
  }

  async scrape(url, currency, symbol, ticker) {
    let data, json;
    try {
      data = await fetch(url);
      json = await data.json();
    } catch (e) {
      logger.error(e);
    }

    json.Data.Data.forEach(async (price) => {
      try {
        const timestamp = new Date(price.time * 1000);
        const day = timestamp.getDate();
        const month = timestamp.getMonth();
        const year = timestamp.getFullYear();
        await this.db.savePrice({
          exchange: "CryptoCompare",
          currency: currency,
          symbol: symbol,
          ticker: ticker,
          price: Math.round(((price.high + price.low) / 2) * 100) / 100,
          timestamp,
          day,
          month,
          year,
        });
      } catch (e) {
        this.logger.warn(e);
      }
    });
  }
}

module.exports = CryptoCompare;
