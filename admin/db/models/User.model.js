const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  picture: { type: String },
  title: { type: String },
  department: { type: String },
  password: { type: String },
  salt: { type: String },
  notifications: { type: Boolean },
  userAdded: { type: Boolean },
  newTransaction: { type: Boolean },
  transactionTagged: { type: Boolean },
  isAdmin: { type: Boolean },
});

user.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", user);

module.exports = User;
