const nodemailer = require("nodemailer");
const { Logger } = require("node-code-utils");

class Transports {
  constructor(config) {
    this.nodemailer = nodemailer;
    this.config = config;
    this.logger = new Logger("Transports");
    return this.init();
  }
  init() {
    this.logger.info(`Creating new ${this.config.service} email transport.`);
    return this.nodemailer.createTransport({
      service: this.config.service,
      auth: {
        user: this.config.auth.user,
        pass: this.config.auth.pass,
      },
    });
  }
}

module.exports = Transports;
