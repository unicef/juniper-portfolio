export default async (settings) => {
  let res;
  try {
    res = await fetch(`/rest/admin/settings/app`, {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify({
        settings,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }
  console.log(res);
};
