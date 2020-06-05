module.exports = {
  environment: process.env.NODE_ENV || "development",
  trustProxy: 1,
  jsonSpaces: 2,
  port: process.env.REST_PORT || 4000,

  db: {
    url: "mongodb://localhost/",
    database: "juniperAdmin",
    mongooseCfg: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
  },
};
