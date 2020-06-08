const { oneMinute } = require("./constants");

module.exports = {
  interval: oneMinute,
  binance: {
    apiUrl: "https://www.binance.com/api/v3/avgPrice?symbol=",
    currencyPairs: [
      { currency: "Bitcoin", symbol: "BTC", ticker: "BTCUSDT" },
      { currency: "Ether", symbol: "ETH", ticker: "ETHUSDT" },
    ],
  },
  bitstamp: {
    apiUrl: "https://www.bitstamp.net/api/v2/ticker/",
    currencyPairs: [
      { currency: "Bitcoin", symbol: "BTC", ticker: "btcusd" },
      { currency: "Ether", symbol: "ETH", ticker: "ethusd" },
    ],
  },
  coinbase: {
    apiUrl: "https://api.coinbase.com/v2/prices/",
    currencyPairs: [
      { currency: "Bitcoin", symbol: "BTC", ticker: "BTC-USD" },
      { currency: "Ether", symbol: "ETH", ticker: "ETH-USD" },
    ],
  },
  mongo: {
    url: "mongodb://localhost/",
    database: "juniperAdmin",
    mongooseCfg: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
  },
};
