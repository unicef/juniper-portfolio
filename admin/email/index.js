const Logger = require("../logger");
const Transports = require("./transports");
const Templates = require("./templates");

class Email {
  constructor(config) {
    this.config = config;
    this.logger = new Logger("Email");
    this.logger.info(`Starting...`);
    this.nodemailer = this.init();
    this.templates = Templates;
  }
  init() {
    this.transport = new Transports(this.config);
  }
  async sendEmail({ from, to, subject, html }) {
    this.logger.info(
      `Sending email from: ${from} to: ${to} subject: ${subject}`
    );
    this.logger.debug(html);

    let email;
    try {
      email = await this.transport.sendMail({ from, to, subject, html });
    } catch (e) {
      this.logger.error(e);
    }
  }
  sendInvitation(email, host, verification) {
    const html = this.templates.InvitationTemplate(host, verification);
    this.sendEmail({
      from: this.config.auth.user,
      to: email,
      subject: "Juniper Admin Invitation",
      html,
    });
  }
}

module.exports = Email;
