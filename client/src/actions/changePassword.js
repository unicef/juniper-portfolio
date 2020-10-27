export default async (currentPassword, newPassword, newPassword2) => {
  let res;
  try {
    res = await fetch(`/rest/admin/settings/user/password`, {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify({
        currentPassword,
        newPassword,
        newPassword2,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    return console.log(e);
  }
  return res;
};
