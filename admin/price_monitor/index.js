require("dotenv").config();
const Logger = require("./lib/logger");
const DB = require("../../db");
const defaultConfig = require("./lib/config");
const Coinbase = require("./lib/coinbase");
const Binance = require("./lib/binance");
const Bitstamp = require("./lib/bitstamp");

class PriceMonitor {
  constructor(config) {
    this.config = config || defaultConfig;
    this.db = new DB(this.config.mongo);
    this.logger = new Logger("PriceMonitor");
    this.coinbase = new Coinbase(this.config.coinbase, this.db);
    this.binance = new Binance(this.config.binance, this.db);
    this.bitstamp = new Bitstamp(this.config.bitstamp, this.db);
  }

  async start() {
    this.logger.info("Started");

    this.getPrices();

    setInterval(() => {
      this.getPrices();
    }, this.config.interval);
  }

  async getPrices() {
    const timestamp = new Date();

    this.coinbase.getPrices(timestamp);
    this.binance.getPrices(timestamp);
    this.bitstamp.getPrices(timestamp);
  }
}

if (require.main === module) {
  const priceMonitor = new PriceMonitor();
  priceMonitor.start();
} else {
  module.exports = PriceMonitor;
}
