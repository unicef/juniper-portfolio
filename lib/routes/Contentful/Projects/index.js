const router = require("express").Router();
const { isAdmin } = require("../../../middleware");
const { Logger } = require("node-core-utils");
const logger = new Logger("Account Routes");
const {client, clientPreview} = require("../config")

router.get("/", async (req, res) => {
  client.getEntries({
    'content_type': 'project'
  }).then( projects => {
    res.json(projects.items.map((project)=> project.fields));
  }).catch((error) => {
    logger.error(error);
    res.status(500).send();
  });
});

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  client.getEntries({
    'content_type': 'project',
    'fields.title': name
  }).then( projects => {
    res.json(projects.items.map((project)=> project.fields));
  }).catch((error) => {
    logger.error(error);
    res.status(500).send();
  });
});

module.exports = router;
