const router = require("express").Router();
const { Logger } = require("node-core-utils");
const logger = new Logger("Private Routes");

router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;
