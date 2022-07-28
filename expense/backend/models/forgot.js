const Sequelize = require("sequelize");

const sequelize = require("./database");

const ForgotPassword = sequelize.define("forgotpassword", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  active:{
    
type:Sequelize.BOOLEAN,
defaultValue:true

  }
});

module.exports = ForgotPassword;
