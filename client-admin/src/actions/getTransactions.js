module.exports = async () => {
  let res;
  let txs = [];
  try {
    res = await fetch("/rest/admin/transactions/hq");
    txs = await res.json();
  } catch (e) {
    console.log(e);
  }
  return txs;
};
