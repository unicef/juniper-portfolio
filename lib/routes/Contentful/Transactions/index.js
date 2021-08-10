const router = require("express").Router();
const {client, clientPreview} = require("../config")
const { Logger } = require("node-core-utils");
const logger = new Logger("Transaction Routes");


router.get("/", async (req, res) => {

  client.getEntries({
    'content_type': 'transaction'
  }).then( txs => {
    // txs.items.forEach(function (tx) {
    //   console.log(JSON.stringify(tx.fields.from))
    // });
    res.json(txs.items);
  }).catch((error) => {
    logger.error(error);
    res.status(500).send();
  });
});

router.get("/hq", async (req, res) => {
  client.getEntries({
    'content_type': 'transaction',
  }).then( txs => {
    const txsHQ = txs.items.filter((tx) => {
      return tx.fields.from.fields.name === 'UNICEF HQ'
    })
    res.json(txsHQ.map(tx => tx.fields));
  }).catch((error) => {
    logger.error(error);
    res.status(500).send();
  });
});

router.get("/unpublished", async (req, res) => {
  clientPreview.getEntries({
    'content_type': 'transaction',
  }).then( txs => {
    res.json(txs);
  }).catch((error) => {
    logger.error(error);
    res.status(500).send();
  });
});


module.exports = router;
