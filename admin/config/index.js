const CONSTANTS = require("./constants");

const uploadLimit = CONSTANTS.oneMegabyte;

module.exports = {
  environment: process.env.NODE_ENV || "development",
  trustProxy: 1,
  jsonSpaces: 2,
  port: process.env.REST_PORT || 4000,
  urlencoded: {
    extended: false,
    limit: uploadLimit,
  },
  uploadLimit,
  db: {
    url: process.env.DB_URL || "mongodb://localhost/",
    database: process.env.DB_NAME || "juniper",
    mongooseCfg: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
  },
};
