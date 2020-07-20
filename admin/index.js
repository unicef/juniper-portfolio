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
  logUserActivity(activity) {
    this.logger.info(`Logging activity: ${activity}`);
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
    let ethBalance = await this.db.getUnicefBalanceForCurrency("ETH");
    let ethSent = await this.db.getTotalUnicefSentForCurrency("ETH");
    let ethReceived = await this.db.getTotalUnicefReceivedForCurrency("ETH");
    let ethFees = await this.db.getTotalUnicefFeesForCurrency("ETH");
    let ethFeesUSD = 0;
    let ethSentUSD = await this.db.getTotalUSDUnicefSentForCurrency("ETH");
    let ethReceivedUSD = await this.db.getTotalUSDUnicefReceivedForCurrency(
      "ETH"
    );

    let btcBalance = await this.db.getUnicefBalanceForCurrency("BTC");
    let btcSent = await this.db.getTotalUnicefSentForCurrency("BTC");
    let btcReceived = await this.db.getTotalUnicefReceivedForCurrency("BTC");
    let btcFees = await this.db.getTotalUnicefFeesForCurrency("BTC");
    let btcFeesUSD = 0;
    let btcSentUSD = await this.db.getTotalUSDUnicefSentForCurrency("BTC");
    let btcReceivedUSD = await this.db.getTotalUSDUnicefReceivedForCurrency(
      "BTC"
    );

    if (ethBalance.length > 0 && ethBalance[0].balance) {
      ethBalance = ethBalance[0].balance;
    } else {
      ethBalance = 0;
    }

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

    if (ethFees.length > 0 && ethFees[0].totalFees) {
      ethFeesUSD = ethFees[0].totalFeesUSD;
      ethFees = ethFees[0].totalFees;
    } else {
      ethFeesUSD = 0;
      ethFees = 0;
    }

    if (ethSentUSD.length > 0 && ethSentUSD[0].totalSentUSD) {
      ethSentUSD = ethSentUSD[0].totalSentUSD;
    } else {
      ethSentUSD = 0;
    }
    if (ethReceivedUSD.length > 0 && ethReceivedUSD[0].totalReceivedUSD) {
      ethReceivedUSD = ethReceivedUSD[0].totalReceivedUSD;
    } else {
      ethReceivedUSD = 0;
    }

    if (btcBalance.length > 0 && btcBalance[0].balance) {
      btcBalance = btcBalance[0].balance;
    } else {
      btcBalance = 0;
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
    if (btcFees.length > 0 && btcFees[0].totalFees) {
      btcFeesUSD = btcFees[0].totalFeesUSD;
      btcFees = btcFees[0].totalFees;
    } else {
      btcFeesUSD = 0;
      btcFees = 0;
    }

    if (btcSentUSD.length > 0 && btcSentUSD[0].totalSentUSD) {
      btcSentUSD = btcSentUSD[0].totalSentUSD;
    } else {
      btcSentUSD = 0;
    }
    if (btcReceivedUSD.length > 0 && btcReceivedUSD[0].totalReceivedUSD) {
      btcReceivedUSD = btcReceivedUSD[0].totalReceivedUSD;
    } else {
      btcReceivedUSD = 0;
    }

    return {
      ethBalance,
      ethSent,
      ethReceived,
      ethFees,
      ethFeesUSD,
      ethSentUSD,
      ethReceivedUSD,

      btcBalance,
      btcSent,
      btcReceived,
      btcFees,
      btcFeesUSD,
      btcSentUSD,
      btcReceivedUSD,
    };
  }
}

if (require.main === module) {
  const juniper = new JuniperAdmin();
  juniper.start();
} else {
  module.exports = JuniperAdmin;
}
