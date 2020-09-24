export default async (email) => {
  let res;
  let users = [];
  try {
    res = await fetch(`/rest/admin/settings/user/remove`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    users = await res.json();
  } catch (e) {
    return console.log(e);
  }

  return users;
};
