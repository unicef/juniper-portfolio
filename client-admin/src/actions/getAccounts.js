export default async () => {
  let res, accounts;
  try {
    res = await fetch("/rest/admin/accounts");
    accounts = await res.json();
  } catch (e) {
    console.log(e);
  }

  return accounts;
};
