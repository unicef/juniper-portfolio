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

  async createUser(user) {
    return this.models.User.findOneAndUpdate(
      {
        email: user.email,
      },
      user,
      { upsert: true }
    );
  }

  async createAccount(account) {
    return this.models.Account.findOneAndUpdate(
      {
        name: account.name,
      },
      account,
      { upsert: true }
    );
  }

  async updateTransactionSourcesForAccount(accountName, address) {
    return this.models.Transaction.updateMany(
      { from: address },
      { source: accountName }
    );
  }

  async updateTransactionDestinationsForAccount(accountName, address) {
    return this.models.Transaction.updateMany(
      { to: address },
      { destination: accountName }
    );
  }

  async updateUser(user) {
    return this.models.User.findOneAndUpdate(
      {
        email: user.email,
      },
      {
        $set: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          picture: user.picture,
          title: user.title,
          department: user.department,
          notifications: user.notifications,
          userAdded: user.userAdded,
          newTransaction: user.newTransaction,
          transactionTagged: user.transactionTagged,
        },
      }
    );
  }

  async getAccounts(active = true) {
    return this.models.Account.find({ active }).sort({ _id: -1 });
  }

  async getAccount(name) {
    return this.models.Account.findOne({ name });
  }

  async getUser(name) {
    return this.models.Account.findOne({ email });
  }

  async getUsers(active = true) {
    return this.models.User.find({ active });
  }

  async getUser(email) {
    return this.models.User.findOne({ email });
  }

  async getUserByVerificationCode(verificationCode) {
    return this.models.User.findOne({ verificationCode });
  }

  async isValidVerificationCode(verificationCode) {
    return await this.models.User.findOne({
      verificationCode,
      isVerified: false,
    });
  }

  async setUserInactive(email) {
    return this.models.User.findOneAndUpdate(
      { email },
      { $set: { active: false } }
    );
  }

  async getActivities() {
    this.logger.info(`getActivities `);
    return this.models.Activity.find();
  }

  async logActivity(activity) {
    this.logger.info(`Logging activity ${JSON.stringify(activity)}`);
    return this.models.Activity(activity).save();
  }

  async saveAuthRecord(authRecord) {
    this.logger.info(`Saving Auth Record ${JSON.stringify(authRecord)}`);
    return this.models.AuthRecord.findOneAndUpdate(
      {
        txid: authRecord.txid,
        contractAddress: authRecord.contractAddress,
        signerAddress: authRecord.signerAddress,
        txIndex: authRecord.txIndex,
      },
      authRecord,
      {
        upsert: true,
      }
    );
  }

  async getAuthRecord(txid) {
    this.logger.info(`Getting Auth Record ${JSON.stringify(txid)}`);
    return this.models.AuthRecord.findOne({ txid });
  }

  async getAuthRecords(contractAddress, txIndex) {
    this.logger.info(
      `Getting Auth Records ${JSON.stringify(contractAddress)} ${JSON.stringify(
        txIndex
      )}`
    );
    return this.models.AuthRecord.find({ contractAddress, txIndex });
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
  async getMultisigWalletFees(address) {
    this.logger.debug(`Getting Wallet fees for ${address}`);
    return this.models.Transaction.aggregate([
      {
        $match: {
          address,
          isMultisigOwner: true,
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
    this.logger.debug(`Get Unicef Wallets`);
    return this.models.Wallet.find({
      isUnicef: true,
    });
  }
  async getTrackedWallets() {
    this.logger.debug(`Get Tracked Wallets`);
    return this.models.Wallet.find({
      $or: [{ isTracked: true }, { isTrackedOther: true }],
    });
  }

  async getTransactions() {
    this.logger.debug(`getTransactions`);
    return this.models.Transaction.find().sort({ _id: -1 });
  }
  async getHQTransactions() {
    this.logger.debug(`getTransactions`);
    return this.models.Transaction.find({ isUnicef: true }).sort({ _id: -1 });
  }

  async getTransactionsForAccount(name) {
    this.logger.debug(`getTransactionsForAccount`);
    return this.models.Transaction.find({
      $or: [{ source: name }, { destination: name }],
      amountUSD: { $gte: 0.01 },
    }).sort({ _id: -1 });
  }

  async getUnpublishedTransactions(notZero) {
    this.logger.debug(`getUnpublishedTransactions`);
    return this.models.Transaction.find({
      isUnicef: true,
      amountUSD: { $gte: 0.01 },
    }).sort({ _id: -1 });
  }

  async archiveTx(txid) {
    this.logger.debug(`archiveTx`);
    return this.models.Transaction.findOneAndUpdate(
      { txid },
      { $set: { archived: true } }
    );
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
    this.logger.info(`Get Price \t${exchange} \t${symbol} \t${timestamp}`);
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
    this.logger.info(`Get Prices \t ${symbol} \t${timeStart} \t${timeEnd}`);
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
  async untrackWallet(address) {
    this.logger.debug(`Untrack Wallet ${address}`);
    return await this.models.Wallet.findOneAndUpdate(
      { address },
      { isTracked: false, isTrackedOther: false }
    );
  }
}

module.exports = MongoDB;
