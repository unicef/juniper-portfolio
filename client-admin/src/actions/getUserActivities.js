export default async () => {
  let res;
  let activities = [];
  try {
    res = await fetch("/rest/admin/settings/activities");
    activities = await res.json();
    activities = activities.reverse();
  } catch (e) {
    console.log(e);
  }

  return activities;
};
