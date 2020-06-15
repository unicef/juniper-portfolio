const mongoose = require("mongoose");
const Logger = require("../logger");
const models = require("./models");

class MongoDB {
  constructor(config) {
    this.config = config;
    this.models = models;
    this.logger = new Logger("MongoDB");
    this.connectionString = `${config.url}/${config.database}`;

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

  async savePrice(price) {
    return new this.models.Price(price).save();
  }
  async getPrice(exchange, symbol, timestamp) {
    return this.models.Price.findOne({
      exchange,
      symbol,
      timestamp: { $lte: timestamp },
    }).sort({
      timestamp: -1,
    });
  }
  async getPrices(
    exchange,
    symbol,
    timeStart = new Date(0),
    timeEnd = new Date()
  ) {
    return this.models.Price.find({
      exchange,
      symbol,
      timestamp: { $gte: timeStart, $lt: timeEnd },
    });
  }
  async averagePrice(
    exchange,
    symbol,
    timeStart = new Date(0),
    timeEnd = new Date()
  ) {
    return this.models.Price.aggregate([
      {
        $match: {
          exchange,
          symbol,
          timestamp: { $gte: timeStart, $lt: timeEnd },
        },
      },
      { $group: { _id: "Coinbase", avgPrice: { $avg: "$price" } } },
    ]);
  }
}

module.exports = MongoDB;
