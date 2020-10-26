export default (account, currency) => {
  return account.addresses
    .filter((address) => address.currency === currency)
    .reduce((total, address) => {
      return total + parseFloat(address.amount) || 0;
    }, 0);
};
