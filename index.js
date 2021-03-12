require("dotenv").config({ path: "./.env" });
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const {
  BitcoinScraper,
  EthereumScraper,
  GnosisScraper,
} = require("./lib/scrapers");
const { Logger } = require("node-core-utils");
const Email = require("./lib/email");
const DB = require("./lib/db");
const utils = require("./lib/utils");
const {
  devMode,
  logRequest,
  isLoggedIn,
  s3Upload,
  s3Download,
} = require("./lib/middleware");
const {
  publicRoutes,
  privateRoutes,
  priceRoutes,
  authRoutes,
  accountRoutes,
  settingRoutes,
  walletRoutes,
  transactionRoutes,
} = require("./lib/routes");
const defaultConfig = require("./config");
const { oneSecond } = require("./config/constants");
const lru = require("lru-cache");

class JuniperAdmin {
  constructor(config) {
    config = { ...defaultConfig, ...config };
    this.config = config;
    this.logger = new Logger("Juniper App");
    this.logger.info(`Starting...`);
    this.updatingWallets = false;
    this.updateWalletQueue = [];
    this.updateWalletJob = null;
    this.updateWalletJobInterval = oneSecond * 5;
    this.resetPasswordCache = new lru(this.config.resetPasswordCache);
    this.init();
  }
  init() {
    this.logger.info("Initializing");
    this.logger.debug(this.config);
    this.environment = this.config.environment;

    this.email = new Email(this.config.email);
    this.db = new DB(this.config.db);
    this.setInitialAppSettings();

    this.bitcoinWalletScraper = new BitcoinScraper(
      this.config.bitcoinScraper,
      this.db
    );

    this.ethereumWalletScraper = new EthereumScraper(
      this.config.ethereumScraper,
      this.db
    );

    this.gnosisWalletScraper = new GnosisScraper({}, this.db);
    this.utils = utils;
    this.passport = passport;

    this.passport.use(
      new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
          let profile = await this.login({ email, password });
          return done(null, {
            provider: "local",
            email,
            password,
            profile,
          });
        }
      )
    );

    this.passport.serializeUser((user, done) => {
      done(null, user);
    });

    this.passport.deserializeUser((user, done) => {
      done(null, user);
    });

    this.server = express();
    this.server.use(
      session({
        store: new MongoStore(this.config.db),
        secret: "secret",
        resave: true,
        saveUninitialized: true,
      })
    );
    this.server.use(passport.initialize());
    this.server.use(passport.session());
    this.server.set("trust_proxy", this.config.trustProxy);
    this.server.set("json spaces", this.config.jsonSpaces);
    this.server.use(bodyParser.urlencoded(this.config.urlencoded));
    this.server.use(bodyParser.json({ limit: this.config.uploadLimit }));
    this.server.use("fetch", fetch);
    this.server.set("juniperAdmin", this);
    this.server.use("/", express.static("./client/build"));
    this.server.use("/admin", express.static("./client/build"));
    this.server.use("/admin/*", express.static("./client/build"));
    this.server.use("/rest", logRequest, devMode);
    this.server.use("/rest", publicRoutes);

    this.server.use(
      "/rest/admin/auth",
      this.passport.authenticate("local"),
      authRoutes
    );
    this.server.use("/rest/admin", isLoggedIn, privateRoutes);
    this.server.use("/rest/admin/prices", isLoggedIn, priceRoutes);
    this.server.use("/rest/admin/accounts", isLoggedIn, accountRoutes);
    this.server.use("/rest/admin/settings", isLoggedIn, settingRoutes);
    this.server.use("/rest/admin/wallets", isLoggedIn, walletRoutes);
    this.server.use("/rest/admin/transactions", isLoggedIn, transactionRoutes);
    this.server.use(
      "/upload/image",
      isLoggedIn,
      s3Upload.single("image"),
      (req, res) => {
        req.file.imageUrl = `/image/${req.file.key}`;
        req.file.downloadUrl = `/download/${req.file.key}`;
        res.json(req.file);
      }
    );
    this.server.use("/download/:key", isLoggedIn, (req, res) => {
      res.setHeader("Content-Disposition", "download");
      s3Download(req.params.key).pipe(res);
    });
    this.server.use("/image/:key", isLoggedIn, (req, res) => {
      s3Download(req.params.key).pipe(res);
    });

    this.server.use("/upload/image", s3Upload.single("image"), (req, res) => {
      req.file.imageUrl = `/image/${req.file.key}`;
      req.file.downloadUrl = `/download/${req.file.key}`;
      res.json(req.file);
    });
    this.server.use("/download/:key", (req, res) => {
      res.setHeader("Content-Disposition", "download");
      s3Download(req.params.key).pipe(res);
    });
    this.server.use("/image/:key", (req, res) => {
      s3Download(req.params.key).pipe(res);
    });

    this.logger.info(`Initialized`);
  }

  logUserActivity(activity) {
    this.logger.info(`Logging activity: ${activity}`);
  }

  start() {
    this.server.listen(this.config.port, () => {
      this.logger.info(`listening on http://localhost:${this.config.port}`);
    });
    this.logger.info(`started in ${this.environment}.`);
  }

  async inviteUser(user, host, verificationCode) {
    this.logger.info(`Creating User: ${user.firstName} ${user.lastName}`);
    await this.db.createUser(user);
    await this.email.sendInvitation(user.email, host, verificationCode);
  }

  async exit() {
    this.logger.info(`exiting`);
    await this.db.disconnect();
    process.exit();
  }

  async savePrice(p) {
    return await this.db.savePrice(p);
  }

  async logActivity(activity) {
    this.db.logActivity(activity);
  }

  async createAccount(account) {
    this.logger.info(`Creating account ${account.name}`);
    this.logger.debug(JSON.stringify(account));

    let etherBalance = 0;
    let bitcoinBalance = 0;

    for (let i = 0; i < account.addresses.length; i++) {
      const address = account.addresses[i];

      await this.db.updateTransactionSourcesForAccount(
        account.name,
        address.address
      );

      await this.db.updateTransactionDestinationsForAccount(
        account.name,
        address.address
      );

      // get balances
      if (address.currency === "Ether") {
        let wallet = await this.ethereumWalletScraper.fetchWalletData(
          address.address
        );

        etherBalance += wallet.balance;
      } else if (address.currency === "Bitcoin") {
        let wallet = await this.bitcoinWalletScraper.fetchWalletData(
          address.address
        );

        const btcBalance =
          (wallet.chain_stats.funded_txo_sum -
            wallet.chain_stats.spent_txo_sum) /
          1e8;

        bitcoinBalance += btcBalance;
      }

      // Fix this later
      account.etherBalance = etherBalance;
      account.bitcoinBalance = bitcoinBalance;
    }

    await this.db.createAccount(account);
  }

  async sendResetPassword(email, host) {
    const token = this.utils.createSalt();
    this.resetPasswordCache.set(token, email);
    await this.email.sendResetEmail(email, host, token);
  }

  async getAccount(name) {
    let account, transactions;
    account = await this.db.getAccount(name);

    transactions = await this.db.getTransactionsForAccount(name);

    return { account, transactions };
  }

  async getAccounts() {
    return await this.db.getAccounts();
  }

  async createWallet(wallet) {
    this.logger.info(`Creating wallet ${wallet.address}`);
    this.logger.debug(wallet);

    await this.db.createWallet(wallet);

    switch (wallet.symbol) {
      case "BTC":
        await this.bitcoinWalletScraper.scrapeTransactionData(
          wallet.address,
          wallet.isUnicef,
          wallet.multisigOwners,
          wallet.isTracked || wallet.isTrackedOther
        );
        break;
      case "ETH":
        await this.ethereumWalletScraper.scrapeTransactionData(
          wallet.address,
          wallet.isUnicef,
          wallet.multisigOwners,
          wallet.isTracked || wallet.isTrackedOther
        );

        if (wallet.isMultisig) {
          this.gnosisWalletScraper.setAddress(wallet.address);
          await this.gnosisWalletScraper.scrapeAuthRecords();
        }

        break;
      default:
        throw new Error(
          "Failed to create wallet. Wallet does not contain a valid symbol"
        );
    }
  }

  async createUser(user) {
    this.logger.info(`Creating user ${user.email}`);
    this.logger.debug(JSON.stringify(user));

    user.salt = this.utils.createSalt();
    user.password = this.utils.hash256(user.password.concat(user.salt));
    await this.db.createUser(user);
  }

  async updateUser(user) {
    this.logger.info(`Updating user ${user.email}`);
    this.logger.debug(JSON.stringify(user));

    await this.db.updateUser(user);
  }

  async isValidVerificationCode(verificationCode) {
    return !!(await this.db.isValidVerificationCode(verificationCode));
  }

  validatePassword(newPassword, newPassword2) {
    this.logger.info(`Validating password`);

    let newPWMatch = false;
    let hasUpper = /[A-Z]/.test(newPassword);
    let hasLower = /[a-z]/.test(newPassword);
    let hasNumbers = /\d/.test(newPassword);
    let hasSpecial = /\W/.test(newPassword);
    let hwPWLength = newPassword.length >= 8;

    //hasNumbers = /\d/.test(password);
    if (newPassword === newPassword2) {
      newPWMatch = true;
    } else {
      this.logger.error("Passwords do not match");
      return false;
    }

    if (
      newPWMatch &&
      hasUpper &&
      hasLower &&
      hasNumbers &&
      hasSpecial &&
      hwPWLength
    ) {
      this.logger.error("Password did not pass validation");
      return true;
    }

    return false;
  }

  async getUserByVerificationCode(verificationCode) {
    return await this.db.getUserByVerificationCode(verificationCode);
  }

  async resetPasswordWithToken(passwordResetToken, newPassword) {
    const email = this.resetPasswordCache.get(passwordResetToken);

    if (!email || email === "undefined") {
      return false;
    }

    let user;
    try {
      user = await this.db.getUser(email);
      user.password = this.utils.hash256(newPassword.concat(user.salt));

      await user.save();
    } catch (e) {
      this.logger.error(e);
      return false;
    }

    return true;
  }

  async changePassword(email, currentPassword, password) {
    let savedUser;

    try {
      savedUser = await this.db.getUser(email);
      const saltedCurrentPassword = this.utils.hash256(
        currentPassword.concat(savedUser.salt)
      );

      if (!savedUser) {
        this.logger.error("User does not exist");
        return false;
      }

      if (savedUser.password !== saltedCurrentPassword) {
        this.logger.error("Saved User password does not match");
        return false;
      }

      savedUser.password = this.utils.hash256(password.concat(savedUser.salt));

      await savedUser.save();
    } catch (e) {
      this.logger.error(e);
      return false;
    }

    return true;
  }

  async setInitialAppSettings() {
    let defaultSettings = this.config.defaultClientSettings;
    let settings = null;

    try {
      settings = await this.getAppSettings();
      if (!settings) {
        this.logger.info("App settings not found, setting default settings");
        await this.updateAppSettings(defaultSettings);
      }
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async getAppSettings() {
    return await this.db.models.Settings.findOne({ id: "settings" });
  }

  async updateAppSettings(settings) {
    return await this.db.models.Settings.findOneAndUpdate(
      { id: settings.id },
      settings,
      { upsert: true }
    );
  }

  async setUserInactive(email, currentUser) {
    const users = await this.db.getUsers();
    const admins = users.filter((user) => {
      return user.isAdmin;
    });
    if (admins.length > 1 && currentUser.email !== email) {
      await this.db.setUserInactive(email);
    }
  }

  async login(user) {
    let savedUser;
    try {
      savedUser = await this.db.getUser(user.email);
    } catch (e) {
      this.logger.error(e);
    }

    if (!savedUser || !savedUser.active || !savedUser.isVerified) return false;

    const saltedPassword = this.utils.hash256(
      user.password.concat(savedUser.salt)
    );

    if (saltedPassword === savedUser.password) {
      this.logger.info(`User authenticated for ${user.email}`);
      this.startUpdateWalletJob();
      return {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        picture: savedUser.picture,
        title: savedUser.title,
        department: savedUser.department,
        notifications: savedUser.notifications,
        userAdded: savedUser.userAdded,
        newTransaction: savedUser.newTransaction,
        transactionTagged: savedUser.transactionTagged,
        didFirstLogin: savedUser.didFirstLogin,
        isAdmin: savedUser.isAdmin,
      };
    } else {
      this.logger.error(`User authentication failed for ${user.email}`);
      return false;
    }
  }

  async getAuthRecords(txid) {
    let record = {};
    let records = [];
    let wallet;
    try {
      record = await this.db.getAuthRecord(txid);
      records = await this.db.getAuthRecords(
        record.contractAddress,
        record.txIndex
      );
      wallet = await this.db.getWallet(record.contractAddress);
      let multisigOwners = {};
      wallet.multisigOwners.forEach((owner) => {
        multisigOwners[owner.walletAddress] = owner.ownerName;
      });

      records = records.map((record) => {
        return {
          contractAddress: record.contractAddress,
          signerAddress: record.signerAddress,
          txIndex: record.txIndex,
          txid: record.txid,
          timestamp: record.timestamp,
          signerName: multisigOwners[record.signerAddress],
        };
      });
    } catch (e) {
      this.logger.error(JSON.stringify(e));
    }
    return records;
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
      ethBalance = utils.roundToFourDecimals(ethBalance[0].balance);
    } else {
      ethBalance = 0;
    }

    if (ethSent.length > 0 && ethSent[0].totalSent) {
      ethSent = utils.roundToFourDecimals(ethSent[0].totalSent);
    } else {
      ethSent = 0;
    }

    if (ethReceived.length > 0 && ethReceived[0].totalReceived) {
      ethReceived = utils.roundToFourDecimals(ethReceived[0].totalReceived);
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
      btcBalance = utils.roundToFourDecimals(btcBalance[0].balance);
    } else {
      btcBalance = 0;
    }

    if (btcSent.length > 0 && btcSent[0].totalSent) {
      btcSent = utils.roundToFourDecimals(btcSent[0].totalSent);
    } else {
      btcSent = 0;
    }
    if (btcReceived.length > 0 && btcReceived[0].totalReceived) {
      btcReceived = utils.roundToFourDecimals(btcReceived[0].totalReceived);
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

  async getPrices() {
    let bitcoin = [];
    let ethereum = [];

    try {
      this.logger.info("Getting BTC Prices");
      bitcoin = await this.db.getPrices("BTC");

      bitcoin.forEach((price) => {
        return this.utils.roundToTwoDecimals(price.average);
      });

      this.logger.info("Getting ETH Prices");
      ethereum = await this.db.getPrices("ETH");

      ethereum.forEach((price) => {
        return this.utils.roundToTwoDecimals(price.average);
      });
    } catch (e) {
      this.logger.error(e);
      return res.status(500).send();
    }

    return {
      bitcoin,
      ethereum,
    };
  }

  async getWallets() {
    return await this.db.models.Wallet.find();
  }

  async updateWalletInQueue() {
    if (this.updateWalletQueue.length === 0) {
      this.updatingWallets = false;
      return null;
    }

    try {
      const wallet = this.updateWalletQueue.pop();
      this.logger.info(`updating wallet: ${wallet}`);
      await this.createWallet(wallet);

      this.updateWalletJob = setTimeout(() => {
        this.updateWalletInQueue();
      }, this.updateWalletJobInterval);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async startUpdateWalletJob() {
    if (this.updatingWallet) return;

    this.updatingWallets = true;

    this.updateWalletQueue = await this.getWallets();

    this.updateWalletInQueue();
  }
}

if (require.main === module) {
  const juniper = new JuniperAdmin();
  juniper.start();
} else {
  module.exports = JuniperAdmin;
}
