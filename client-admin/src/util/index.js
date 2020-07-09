const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const cryptoFormatter = (amount) => {
  return Math.round(amount * 1e5) / 1e5;
};

module.exports = {
  usdFormatter,
  cryptoFormatter,
};
