const CONSTANTS = require("./constants");

const { oneMegabyte } = CONSTANTS;

module.exports = {
  environment: process.env.NODE_ENV || "development",
  trustProxy: 1,
  jsonSpaces: 2,
  port: process.env.SERVER_PORT || 4000,
  urlencoded: {
    extended: false,
    limit: oneMegabyte,
  },
  uploadLimit,
  db: {
    url: process.env.DB_URL || "mongodb://localhost",
    database: process.env.DB_NAME || "juniper",
    mongooseCfg: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
  },
};