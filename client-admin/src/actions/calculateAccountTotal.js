module.exports = (account, currency) => {
  return account.addresses
    .filter((address) => address.currency === currency)
    .reduce((total, address) => {
      return total + address.amount;
    }, 0);
};
