export default async () => {
  let res;
  let users = [];
  try {
    res = await fetch("/rest/admin/settings/users");
    users = await res.json();
  } catch (e) {
    console.log(e);
  }
  return users;
};
