const mongoose = require("mongoose");
const Logger = require("../logger");
const models = require("./models");

class MongoDB {
  constructor(config) {
    this.config = config;
    this.models = models;
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

    this.logger.info(`Connected: ${this.connectionString}`);

    this.logger.info("Initialized");
  }

  async createWallet(wallet) {
    return new this.models.Wallet(wallet).save();
  }
  async getWallet(address) {
    return new this.models.Wallet.findOne({ address });
  }
  async getWallets() {
    return new this.models.Wallet.find();
  }
}

module.exports = MongoDB;
