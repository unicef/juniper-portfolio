export default async (settings, setAppSettings) => {
  let res, data;
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
    data = await res.json();
  } catch (e) {
    console.log(e);
  }
  setAppSettings(data);
};
