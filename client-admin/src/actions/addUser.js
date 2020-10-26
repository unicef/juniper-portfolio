export default async (user) => {
  let res;
  let users = [];

  try {
    res = await fetch(`/rest/admin/settings/user/invite`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        user,
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
