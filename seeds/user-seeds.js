const { User } = require("../models");

const userData = [
  {
    username: "admin",
    email: "admin@admin.com",
    password: "admin",
    role: "admin",
  },
  {
    username: "user",
    email: "user@user.com",
    password: "user",
    role: "user",
  },
];
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
