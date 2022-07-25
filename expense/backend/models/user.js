let Sequelize=require('sequelize')

let sequelize=require('./database');


let User=sequelize.define('user',{

    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
    ,
    phonenumber:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    issubcribed:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }

});

module.exports=User;