const bunyan = require("bunyan");
const bformat = require("bunyan-format");
const formatOut = bformat({
  outputMode: "short",
});

class Logger {
  constructor(name) {
    const config = Logger.DEFAULTS;
    config.name = name || config.name;
    const logger = bunyan.createLogger(config);
    logger.level(config.level);
    return logger;
  }

  static get DEFAULTS() {
    return {
      name: "logger",
      level: process.env.NODE_ENV === "debug" ? "debug" : "info",

      streams: [
        {
          type: "file",
          path: `/tmp/logger.log`,
          period: "1d",
          count: 30,
        },
        {
          stream: formatOut,
        },
      ],
    };
  }
}

module.exports = Logger;
