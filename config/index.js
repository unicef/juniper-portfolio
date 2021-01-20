const CONSTANTS = require("./constants");

const { oneMegabyte, oneDay, oneMinute } = CONSTANTS;

module.exports = {
  startPriceMonitor: process.env.MONITOR_PRICE || true,
  environment: process.env.NODE_ENV || "development",
  trustProxy: 1,
  jsonSpaces: 2,
  port: process.env.SERVER_PORT || 9000,
  urlencoded: {
    extended: false,
    limit: oneMegabyte,
  },
  uploadLimit: oneMegabyte,
  resetPasswordCache: {
    max: 10000,
    length: function (n, key) {
      return n * 2 + key.length;
    },
    dispose: function (key, n) {
      n = "";
    },
    maxAge: 15 * oneMinute * 1000,
  },
  defaultClientSettings: {
    id: "settings",
    primaryColor: "#00aeef",
    lightPrimaryColor: "#daf5ff",
    darkPrimaryColor: "#374ea2",
    containedButtonHover: "#33bef2",
    containedButtonActive: "#0094cb",
    textButtonHover: "#ecfaff",
    logoUrl: "/image/1601918615229-UNICEF.png",
  },
  email: {
    key: process.env.AWS_SES_ACCESS_KEY,
    secret: process.env.AWS_SES_SECRET_KEY,
    user: process.env.EMAIL_ADDRESS,
  },
  db: {
    url: process.env.DB_URL || "mongodb://localhost",
    database: process.env.DB_NAME || "juniper",
    mongooseCfg: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true,
    },
  },
  wallet: {
    limit: 50,
  },
  bitcoinScraper: {
    network: "main",
  },
  ethereumScraper: {
    apiKey: process.env.ETHERSCAN_API_KEY || null,
  },
  priceMonitor: {
    interval: oneDay,
    cryptoCompare: {
      scrape: false,
    },
    binance: {
      scrape: false,
      apiUrl: "https://www.binance.com/api/v3/avgPrice?symbol=",
      currencyPairs: [
        { currency: "Bitcoin", symbol: "BTC", ticker: "BTCUSDT" },
        { currency: "Ether", symbol: "ETH", ticker: "ETHUSDT" },
      ],
    },
    bitstamp: {
      scrape: false,
      apiUrl: "https://www.bitstamp.net/api/v2/ticker/",
      currencyPairs: [
        { currency: "Bitcoin", symbol: "BTC", ticker: "btcusd" },
        { currency: "Ether", symbol: "ETH", ticker: "ethusd" },
      ],
    },
    coinbase: {
      scrape: false,
      apiUrl: "https://api.coinbase.com/v2/prices/",
      currencyPairs: [
        { currency: "Bitcoin", symbol: "BTC", ticker: "BTC-USD" },
        { currency: "Ether", symbol: "ETH", ticker: "ETH-USD" },
      ],
    },
    mongo: {
      url: "mongodb://localhost/",
      database: process.env.DB_NAME || "juniper",
      mongooseCfg: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
    },
  },
};
