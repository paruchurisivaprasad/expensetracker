const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ExpenseTracker", "root", "paruchurisivaprasad", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
