let express=require('express');

let bodyParser=require('body-parser');

let bcrypt=require('bcrypt');
let cors=require('cors');
const sequelize = require("./models/database");

let app=express();
let SignUpLogin=require('./routes/usersignup');

app.use(bodyParser.json());
app.use(cors());
app.use(SignUpLogin);



sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(8400, () => {
      console.log(" listening to 8400 port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
 
 





