const Juniper = require("..");
const config = require("../config");

const juniper = new Juniper(config);

console.log(juniper);

const user = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@user.com",
  picture: "url",
  title: "Admin",
  department: "UNICEF",
  password: "asdf1234",
  salt: "",
  notifications: true,
  userAdded: true,
  newTransaction: true,
  transactionTagged: true,
  isAdmin: true,
};

juniper.createUser(user);
