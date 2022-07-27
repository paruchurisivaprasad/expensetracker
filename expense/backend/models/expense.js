let Sequelize=require('sequelize');
let sequelize=require('./database');


let Expense=sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});


module.exports=Expense;