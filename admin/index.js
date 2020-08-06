require("dotenv").config({ path: "../.env" });
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const PriceMonitor = require("./price_monitor");
const fetch = require("node-fetch");
const { BitcoinScraper, EthereumScraper } = require("./wallet_scrapers");
const Logger = require("./logger");
const DB = require("./db");
const utils = require("./utils");
const {
  devMode,
  logRequest,
  isLoggedIn,
  s3Upload,
  s3Download,
} = require("./middleware");
const {
  publicRoutes,
  privateRoutes,
  authRoutes,
  accountRoutes,
  settingRoutes,
  walletRoutes,
  transactionRoutes,
} = require("./routes");
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
    this.server.use("/rest", logRequest, devMode);
    this.server.use("/rest", publicRoutes);

    this.server.use(
      "/rest/admin/auth",
      this.passport.authenticate("local"),

      authRoutes
    );
    this.server.use("/rest/admin", isLoggedIn, privateRoutes);
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

  async inviteUser(user) {
    await this.db.createUser(user);
  }

  async logActivity(activity) {
    this.db.logActivity(activity);
  }

  async createWallet(wallet) {
    this.logger.debug(`createWallet ${wallet}`);
    this.db.createWallet(wallet);
  }

  async createUser(user) {
    user.salt = this.utils.createSalt();
    user.password = this.utils.hash256(user.password.concat(user.salt));
    await this.db.createUser(user);
  }

  async updateUser(user) {
    await this.db.updateUser(user);
  }

  validatePassword(newPassword, newPassword2) {
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

    console.log(savedUser);
    return true;
  }

  async login(user) {
    let savedUser;
    try {
      savedUser = await this.db.getUser(user.email);
    } catch (e) {
      this.logger.error(e);
    }

    if (!savedUser) return false;

    const saltedPassword = this.utils.hash256(
      user.password.concat(savedUser.salt)
    );

    if (saltedPassword === savedUser.password) {
      this.logger.info(`User authenticated for ${user.email}`);
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
        isAdmin: savedUser.isAdmin,
      };
    } else {
      this.logger.error(`User authentication failed for ${user.email}`);
      return false;
    }
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
