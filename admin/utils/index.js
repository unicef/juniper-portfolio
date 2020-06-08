const web3Utils = require("web3-utils");

function getUnixTime() {
  return new Date().getTime() / 1000;
}

module.exports = { ...web3Utils, getUnixTime };
