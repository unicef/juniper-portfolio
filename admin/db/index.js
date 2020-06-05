const mongoose = require("mongoose");
const Logger = require("../logger");
const models = require("./models");

class MongoDB {
  constructor(config) {
    this.config = config;
    this.logger = new Logger("MongoDB");
    this.connectionString = `${config.url}${config.database}`;

    this.logger.info(`Starting...`);
    this.init();
  }

  async init() {
    this.logger.info("Initializing:");
    this.logger.debug(this.config);
    try {
      this.mongoose = await mongoose.connect(
        this.connectionString,
        this.config.mongooseCfg
      );
    } catch (e) {
      return this.logger.error(e);
    }

    this.models = models;

    this.logger.info("Initialized");
  }

  async start() {
    this.logger.info(`Started: ${this.connectionString}`);
  }
}

module.exports = MongoDB;
