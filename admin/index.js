require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const PriceMonitor = require("./price_monitor");
const fetch = require("node-fetch");
const { BitcoinScraper, EthereumScraper } = require("./wallet_scrapers");
const Logger = require("./logger");
const DB = require("./db");
const utils = require("./utils");
const { logRequest } = require("./middleware");
const { publicRoutes, privateRoutes } = require("./routes")();
const defaultConfig = require("./config");

class JuniperAdmin {
  constructor(config) {
    config = { ...defaultConfig, ...config };
    this.config = config;
    this.logger = new Logger("Juniper App");
    this.logger.info(`Starting...`);
    this.init();
  }
  init() {
    this.logger.info("Initializing");
    this.logger.debug(this.config);
    this.environment = this.config.environment;

    this.db = new DB(this.config.db);
    this.priceMonitor = new PriceMonitor(this.config.priceMonitor, this.db);
    this.bitcoinWalletScraper = new BitcoinScraper(
      this.config.bitcoinScraper,
      this.db
    );
    this.ethereumWalletScraper = new EthereumScraper(
      this.config.ethereumScraper,
      this.db
    );
    this.utils = utils;

    this.server = express();
    this.server.set("trust_proxy", this.config.trustProxy);
    this.server.set("json spaces", this.config.jsonSpaces);
    this.server.use(bodyParser.urlencoded(this.config.urlencoded));
    this.server.use(bodyParser.json({ limit: this.config.uploadLimit }));
    this.server.use("fetch", fetch);
    this.server.set("juniperAdmin", this);
    this.server.use("/rest", logRequest);
    this.server.use("/rest", publicRoutes);
    this.server.use("/rest/admin", privateRoutes);

    this.logger.info(`Initialized`);
  }

  startPriceMonitor() {
    if (this.config.startPriceMonitor) {
      this.priceMonitor.start();
    }
  }
  start() {
    this.startPriceMonitor();

    this.server.listen(this.config.port, () => {
      this.logger.info(`listening on http://localhost:${this.config.port}`);
    });
    this.logger.info(`started in ${this.environment}.`);
  }

  async getWalletSummary() {
    let ethSent = await this.db.getTotalSentForCurrency("ETH");
    let ethReceived = await this.db.getTotalReceivedForCurrency("ETH");
    let btcSent = await this.db.getTotalSentForCurrency("BTC");
    let btcReceived = await this.db.getTotalReceivedForCurrency("BTC");

    if (ethSent.length > 0 && ethSent[0].totalSent) {
      ethSent = ethSent[0].totalSent;
    } else {
      ethSent = 0;
    }
    if (ethReceived.length > 0 && ethReceived[0].totalReceived) {
      ethReceived = ethReceived[0].totalReceived;
    } else {
      ethReceived = 0;
    }
    if (btcSent.length > 0 && btcSent[0].totalSent) {
      btcSent = btcSent[0].totalSent;
    } else {
      btcSent = 0;
    }
    if (btcReceived.length > 0 && btcReceived[0].totalReceived) {
      btcReceived = btcReceived[0].totalReceived;
    } else {
      btcReceived = 0;
    }

    return {
      ethSent,
      ethReceived,
      btcSent,
      btcReceived,
    };
  }
}

if (require.main === module) {
  const juniper = new JuniperAdmin();
  juniper.start();
} else {
  module.exports = JuniperAdmin;
}
