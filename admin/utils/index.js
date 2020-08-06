const web3Utils = require("web3-utils");

function getUnixTime() {
  return new Date().getTime() / 1000;
}

function hash256(value) {
  return web3Utils.keccak256(value);
}

function createSalt() {
  return hash256(Math.random().toString());
}

function createVerificationCode() {
  return `${Math.random() * 1e18}${Math.random() * 1e18}`;
}

module.exports = {
  ...web3Utils,
  getUnixTime,
  hash256,
  createSalt,
  createVerificationCode,
};
