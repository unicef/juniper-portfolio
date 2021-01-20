export default async (email) => {
  try {
    await fetch(`/rest/password/reset`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    return false;
  }

  return true;
};
