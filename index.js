const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser');

dotenv.config()

const JuniperAdmin = require("./admin");
const juniperAdmin = new JuniperAdmin();

const port = process.env.SERVER_PORT;

const mount = async (app) => {

  app.use(cookieParser());
  app.use("/admin", express.static("./client-admin/build"));
  app.use("/admin/*", express.static("./client-admin/build"));

  app.use("/", juniperAdmin.server);

  app.listen(port);

  app.get("*", function (req, res) {
    res.redirect("/");
  });
};

mount(express());