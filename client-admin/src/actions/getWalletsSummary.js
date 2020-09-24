export default async () => {
  let data, summary;
  try {
    data = await fetch("/rest/admin/wallets/summary");
    summary = await data.json();
  } catch (e) {
    console.log(e);
  }
  return summary;
};
