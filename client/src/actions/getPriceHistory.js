export default async () => {
  let res, prices;
  try {
    res = await fetch("/rest/admin/prices");
    prices = await res.json();
  } catch (e) {
    console.log(e);
  }

  return prices;
};
