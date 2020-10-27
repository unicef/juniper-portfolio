export default async (address) => {
  let res, transactions;
  try {
    res = await fetch(`/rest/admin/transactions/address/${address}`);
    transactions = await res.json();
  } catch (e) {
    return console.log(e);
  }

  return transactions;
};
