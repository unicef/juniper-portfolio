const Juniper = require("..");
const config = require("../config");

const juniper = new Juniper(config);

const user = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@user.com",
  picture: "url",
  title: "Admin",
  department: "Office of Innovation",
  password: "asdf1234",
  salt: "",
  notifications: true,
  userAdded: true,
  newTransaction: true,
  transactionTagged: true,
  isAdmin: true,
};

juniper.createUser(user);
