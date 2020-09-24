export default async (address) => {
  let res, wallet;
  try {
    res = await fetch(`/rest/admin/wallets/${address}`);
    wallet = await res.json();
  } catch (e) {
    return console.log(e);
  }
  return wallet;
};
