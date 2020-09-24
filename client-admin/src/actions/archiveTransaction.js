export default async (txid) => {
  try {
    await fetch(`/rest/admin/transactions/archive`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        txid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
    return;
  }
};
