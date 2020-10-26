const router = require("express").Router();
const { Logger } = require("node-code-utils");
const logger = new Logger("Private Routes");

router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;
