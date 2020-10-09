export default async () => {
  let res;
  let settings = {};
  try {
    res = await fetch("/rest/settings/app");
    settings = await res.json();
  } catch (e) {
    console.log(e);
  }
  return settings;
};
