export default async () => {
  let res;
  const defaultSettings = {
    logoUrl: "/image/1601918615229-UNICEF.png",
    primaryColor: "#00aeef",
    lightPrimaryColor: "#daf5ff",
    darkPrimaryColor: "#374ea2",
    containedButtonHover: "#33bef2",
    containedButtonActive: "#0094cb",
    textButtonHover: "#ecfaff",
  };
  let settings = defaultSettings;
  try {
    res = await fetch("/rest/settings/app");
    settings = await res.json();
  } catch (e) {
    console.log(e);
    settings = defaultSettings;
  }

  if (!settings) {
    settings = defaultSettings;
  }
  return settings;
};
