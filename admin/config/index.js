const CONSTANTS = require("./constants");

const { oneMegabyte, oneDay } = CONSTANTS;

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
  email: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
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
      scrape: true,
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
