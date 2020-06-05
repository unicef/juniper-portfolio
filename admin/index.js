const express = require("express");
const Logger = require("./logger");
const DB = require("./db");
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

    this.server.set("trust_proxy", this.config.trustProxy);
    this.server.set("json spaces", this.config.jsonSpaces);
    this.server.set("juniper", this);

    this.server.use("/api", publicRoutes);
    this.server.use("/admin/api", privateRoutes);

    this.logger.info(`Initialized`);
  }
  start() {
    this.server.listen(this.config.port, () => {
      this.logger.info(`listening on port ${this.config.port}`);
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
