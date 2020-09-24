export default async (tx, donor, publish) => {
  tx.published = publish;

  try {
    await fetch(`/rest/admin/transactions/publish`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        tx,
        donor,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }
};
