const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  address: { type: String, index: true },
  name: { type: String },
  currency: { type: String },
  signers: { type: Array },
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
