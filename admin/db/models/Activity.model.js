const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activity = new Schema({
  name: { type: String },
  message: { type: String },
});

const Activity = mongoose.model("Activity", activity);

module.exports = Activity;
