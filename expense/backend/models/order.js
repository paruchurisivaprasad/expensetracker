const Sequelize=require('sequelize');
const sequelize=require('./database');

let Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  paymentid: {
    type: Sequelize.STRING,
  },

  orderid: {
    type: Sequelize.STRING,
  },

  status: {
    type: Sequelize.STRING,
  }
});

module.exports=Order;