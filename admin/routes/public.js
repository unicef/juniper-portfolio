const router = require("express").Router();

router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;
