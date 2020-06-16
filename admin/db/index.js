const mongoose = require("mongoose");
const Logger = require("../logger");
const models = require("./models");

class MongoDB {
  constructor(config) {
    this.config = {
      url: process.env.DB_URL || "mongodb://localhost",
      database: process.env.DB_NAME || "juniper",
      mongooseCfg: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    };
    this.models = models;
    this.logger = new Logger("MongoDB");
    this.connectionString = `${this.config.url}/${this.config.database}`;

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
    return this.models.Wallet.findOne({ address });
  }
  async getWallets() {
    return this.models.Wallet.find({});
  }
  async saveTransaction(tx) {
    return this.models.Transaction.findOneAndUpdate(
      {
        txid: tx.txid,
        index: tx.index,
      },
      tx,
      { upsert: true }
    );
  }
  async getTransaction(txid) {
    return this.models.Transaction.findOne({ txid });
  }
  async getTransactionsForAddress(address) {
    return this.models.Transaction.find({ address });
  }

  async savePrice(price) {
    return this.models.Price.findOneAndUpdate(
      {
        exchange: price.exchange,
        symbol: price.symbol,
        timestamp: price.timestamp,
      },
      price,
      { upsert: true }
    );
  }
  async getPrice(exchange, symbol, timestamp) {
    return this.models.Price.findOne({
      exchange,
      symbol,
      timestamp: { $lte: timestamp },
    })
      .sort({
        timestamp: -1,
      })
      .limit(1);
  }
  async getPrices(symbol, timeStart = new Date(0), timeEnd = new Date()) {
    return this.models.Price.find({
      symbol,
      timestamp: { $gte: timeStart, $lt: timeEnd },
    });
  }
  async averagePriceInDateRange(
    symbol,
    timeStart = new Date(0),
    timeEnd = new Date()
  ) {
    return this.models.Price.aggregate([
      {
        $match: {
          symbol,
          timestamp: { $gte: timeStart, $lt: timeEnd },
        },
      },
      { $group: { _id: "Average", avgPrice: { $avg: "$price" } } },
    ]);
  }
  async getNearestPrice(symbol, day = new Date()) {
    return await this.models.Price.findOne({
      symbol,
      timestamp: { $gte: day },
    });
  }
}

module.exports = MongoDB;
