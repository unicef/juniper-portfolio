const mongoose = require("mongoose");
const Logger = require("../logger");
const models = require("./models");

class MongoDB {
  constructor(config) {
    this.config = config || {
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
    this.logger.debug(`Creating Wallet ${JSON.stringify(wallet)}`);
    return this.models.Wallet.findOneAndUpdate(
      {
        address: wallet.address,
      },
      wallet,
      { upsert: true }
    );
  }
  async getWallet(address) {
    this.logger.debug(`Getting Wallet for ${address}`);
    return this.models.Wallet.findOne({ address });
  }
  async getWalletFees(address) {
    this.logger.debug(`Getting Wallet fees for ${address}`);
    return this.models.Transaction.aggregate([
      {
        $match: {
          address,
          sent: true,
        },
      },
      {
        $group: {
          _id: "Fees",
          totalFees: { $sum: "$fee" },
          totalFeesUSD: { $sum: "$feeUSD" },
        },
      },
    ]);
  }
  async updateWallet(address, fields) {
    this.logger.debug(
      `Updating Wallet for ${address} with ${JSON.stringify(fields)}`
    );
    return this.models.Wallet.findOneAndUpdate(
      {
        address: address,
      },
      { ...fields }
    );
  }
  async getUnicefBalanceForCurrency(symbol) {
    return this.models.Wallet.aggregate([
      {
        $match: {
          symbol,
          isUnicef: true,
        },
      },
      { $group: { _id: "Sum", balance: { $sum: "$balance" } } },
    ]);
  }
  async getTotalUnicefSentForCurrency(symbol) {
    this.logger.debug(`getTotalSentForCurrency \t ${symbol}`);
    return this.models.Transaction.aggregate([
      {
        $match: {
          symbol,
          sent: true,
          isUnicef: true,
        },
      },
      { $group: { _id: "Sum", totalSent: { $sum: "$amount" } } },
    ]);
  }
  async getTotalUnicefReceivedForCurrency(symbol) {
    this.logger.debug(`getTotalReceivedForCurrency \t ${symbol}`);
    return this.models.Transaction.aggregate([
      {
        $match: {
          symbol,
          received: true,
          isUnicef: true,
        },
      },
      { $group: { _id: "Sum", totalReceived: { $sum: "$amount" } } },
    ]);
  }
  async getTotalUSDUnicefSentForCurrency(symbol) {
    this.logger.debug(`getTotalSentForCurrency \t ${symbol}`);
    return this.models.Transaction.aggregate([
      {
        $match: {
          symbol,
          sent: true,
          isUnicef: true,
        },
      },
      { $group: { _id: "Sum", totalSentUSD: { $sum: "$amountUSD" } } },
    ]);
  }
  async getTotalUSDUnicefReceivedForCurrency(symbol) {
    this.logger.debug(`getTotalReceivedForCurrency \t ${symbol}`);
    return this.models.Transaction.aggregate([
      {
        $match: {
          symbol,
          received: true,
          isUnicef: true,
        },
      },
      { $group: { _id: "Sum", totalReceivedUSD: { $sum: "$amountUSD" } } },
    ]);
  }
  async getTotalUnicefFeesForCurrency(symbol) {
    this.logger.debug(`getTotalUnicefFeesForCurrency \t ${symbol}`);
    return this.models.Wallet.aggregate([
      {
        $match: {
          symbol,
          isUnicef: true,
        },
      },
      {
        $group: {
          _id: "Sum",
          totalFees: { $sum: "$fees" },
          totalFeesUSD: { $sum: "$feesUSD" },
        },
      },
    ]);
  }
  async getUnicefWallets() {
    this.logger.debug(`Get Wallets`);
    return this.models.Wallet.find({
      isUnicef: true,
    });
  }

  async createStartup(startup) {
    return new this.models.Startup(startup).save();
  }

  async getStartups()
  {
    this.logger.info("Getting startup info...");
    return this.models.Startup.find({});
  }
  async saveTransaction(tx) {
    this.logger.debug(`Saving Transaction ${JSON.stringify(tx)}`);
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
    this.logger.debug(`Get Transaction ${txid}`);
    return this.models.Transaction.findOne({ txid });
  }
  async getTransactionsForAddress(address) {
    this.logger.debug(`Get Transactions for ${address}`);
    return this.models.Transaction.find({ address }).sort({ timestamp: -1 });
  }

  async savePrice(price) {
    this.logger.debug(`Saving Price ${JSON.stringify(price)}`);
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
    this.logger.debug(`Get Price \t${exchange} \t${symbol} \t${timestamp}`);
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
    this.logger.debug(`Get Prices \t ${symbol} \t${timeStart} \t${timeEnd}`);
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
    this.logger.debug(
      `AveragePriceInDateRange \t ${symbol} \t${timeStart} \t${timeEnd}`
    );
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
    this.logger.debug(`Get Nearest Price \t${symbol} \t${day}`);
    return await this.models.Price.findOne({
      symbol,
      timestamp: { $gte: day },
    });
  }
}

module.exports = MongoDB;
