const { Logger } = require("node-core-utils");

function devMode(req, res, next) {
  const logger = new Logger("devMode");

  if (process.env.NODE_ENV === "DEV") {
    logger.info("Setting devmode user");
    const passport = {
      user: {
        profile: {
          firstName: "Dev",
          lastName: "ENV",
          email: "dev@env.com",
          picture: "url",
          title: "DEV",
          department: "Office of Innovation",
          password: "asdf1234",
          salt: "",
          notifications: true,
          userAdded: true,
          newTransaction: true,
          transactionTagged: true,
          isAdmin: true,
          isDev: true,
        },
      },
    };

    req.session.passport = passport;
  } else {
    try {
      if (
        req.session &&
        req.session.passport &&
        req.session.passport.user &&
        req.session.passport.user.profile &&
        req.session.passport.user.profile.isDev
      ) {
        logger.info("Destroying devMode session");
        req.session.destroy();
      }
    } catch (e) {
      logger.error(JSON.stringify(e));
    }
  }

  next();
}

module.exports = { devMode };
