const express = require("express");
const bodyParser = require("body-parser");
const PriceMonitor = require("./price_monitor");
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
    this.server = express();
    this.priceMonitor = new PriceMonitor();
    this.utils = utils;

    this.server.set("trust_proxy", this.config.trustProxy);
    this.server.set("json spaces", this.config.jsonSpaces);
    this.server.use(bodyParser.urlencoded(this.config.urlencoded));
    this.server.use(bodyParser.json({ limit: this.config.uploadLimit }));
    this.server.set("juniperAdmin", this);

    this.server.use("/api", logRequest, publicRoutes);
    this.server.use("/admin/api", logRequest, privateRoutes);

    this.logger.info(`Initialized`);
  }
  start() {
    if (this.config.startPriceMonitor) {
      this.priceMonitor.start();
    }

    this.server.listen(this.config.port, () => {
      this.logger.info(`listening on http://localhost:${this.config.port}`);
    });
    this.logger.info(`started in ${this.environment}.`);
  }
}

if (require.main === module) {
  const juniper = new JuniperAdmin();
  juniper.start();
} else {
  module.exports = JuniperAdmin;
}
