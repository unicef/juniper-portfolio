export default async () => {
  let res, trackedWallets;
  try {
    res = await fetch("/rest/admin/wallets/tracked");
    trackedWallets = await res.json();
  } catch (e) {
    return console.log(e);
  }
  return trackedWallets;
};
