const { Logger } = require("node-core-utils");
const Templates = require("./templates");
const ses = require("node-ses");

const { AWS_SES_ACCESS_KEY, AWS_SES_SECRET_KEY } = process.env;

class Email {
  constructor(config) {
    this.config = config;
    this.logger = new Logger("Email");
    this.logger.info(`Starting...`);
    this.nodemailer = this.init();
    this.templates = Templates;
  }
  init() {
    this.client = ses.createClient({
      key: this.config.key,
      secret: this.config.secret,
    });
  }
  async sendEmail({ from, to, subject, message }) {
    this.logger.info(
      `Sending email from: ${from} to: ${to} subject: ${subject}`
    );

    let email;
    try {
      email = await this.client.sendEmail(
        { from, to, subject, message },
        (err, data, res) => {
          if (err) {
            this.logger.error(err);
          }
        }
      );
    } catch (e) {
      this.logger.error(e);
    }
  }
  sendInvitation(email, host, verification) {
    const message = this.templates.InvitationTemplate(host, verification);
    this.sendEmail({
      from: this.config.user,
      to: email,
      subject: "Juniper Admin Invitation",
      message,
    });
  }
  sendResetEmail(email, host, token) {
    const message = this.templates.resetPasswordTemplate(host, token);
    this.sendEmail({
      from: this.config.user,
      to: email,
      subject: "Reset Your Juniper Password",
      message,
    });
  }
}

module.exports = Email;
