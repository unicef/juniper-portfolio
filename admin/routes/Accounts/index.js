const router = require("express").Router();
const Logger = require("../../logger");
const logger = new Logger("Account Routes");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
  } catch (e) {
    return res.status(500).send();
  }
  res.send();
});

module.exports = router;
