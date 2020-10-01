require("dotenv").config();
const { Logger } = require("node-code-utils");
const Coinbase = require("./lib/coinbase");
const Binance = require("./lib/binance");
const Bitstamp = require("./lib/bitstamp");
const CryptoCompare = require("./lib/cryptocompare");

class PriceMonitor {
  constructor(config, db) {
    this.config = config;
    this.logger = new Logger("PriceMonitor");
    this.db = db;
    this.coinbase = new Coinbase(this.config.coinbase, this.db);
    this.binance = new Binance(this.config.binance, this.db);
    this.bitstamp = new Bitstamp(this.config.bitstamp, this.db);
    this.cryptoCompare = new CryptoCompare(this.config.cryptocompare, this.db);
  }

  async start() {
    this.logger.info("Started");

    this.getPrices(2000);

    setInterval(() => {
      this.getPrices(10);
    }, this.config.interval);
  }

  async getPrice(symbol) {
    return this.cryptoCompare.getPrice(symbol);
  }

  async getPrices(limit) {
    const timestamp = new Date();

    if (this.config.coinbase.scrape) {
      this.coinbase.getPrices(timestamp);
    }
    if (this.config.binance.scrape) {
      this.binance.getPrices(timestamp);
    }
    if (this.config.bitstamp.scrape) {
      this.bitstamp.getPrices(timestamp);
    }

    if (this.config.cryptoCompare.scrape) {
      this.cryptoCompare.getBTCPrices(limit);
      this.cryptoCompare.getETHPrices(limit);
    }
  }
}

if (require.main === module) {
  const priceMonitor = new PriceMonitor();
  priceMonitor.start();
} else {
  module.exports = PriceMonitor;
}
