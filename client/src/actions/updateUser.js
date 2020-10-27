export default async (user) => {
  try {
    await fetch(`/rest/admin/settings/user`, {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify({
        user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }
  return user;
};
