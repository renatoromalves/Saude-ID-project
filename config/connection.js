const Sequelize = require("sequelize");

const connection = new Sequelize({
  dialect: "sqlite",
  storage: "saudeblog.sqlite",
});

module.exports = connection;
