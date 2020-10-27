const web3Utils = require("web3-utils");

const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

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
  debounce,
  getUnixTime,
  hash256,
  createSalt,
  createVerificationCode,
};
