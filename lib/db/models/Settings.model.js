const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settings = new Schema({
  id: { type: String },
  logoUrl: { type: String },
  primaryColor: { type: String },
  lightPrimaryColor: { type: String },
  darkPrimaryColor: { type: String },
  containedButtonHover: { type: String },
  containedButtonActive: { type: String },
  textButtonHover: { type: String },
});

const Settings = mongoose.model("Settings", settings);

module.exports = Settings;
