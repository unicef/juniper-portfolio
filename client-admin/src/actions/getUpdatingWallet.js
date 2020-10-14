export default async () => {
  let res, json;
  try {
    res = await fetch("/rest/admin/wallets/updating");
    json = await res.json();
  } catch (e) {
    return console.log(e);
  }
  return json.updating;
};
