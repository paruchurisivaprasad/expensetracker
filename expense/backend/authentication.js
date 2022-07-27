

const jwt = require("jsonwebtoken");
const User = require('./models/user');
let ammananna='db43a197a80ce2990dab5eb45d7bf4b25f3d5d1824d856ed4a186930016e85980d1f94e4944005f0a752e895c8dc6d29bcfcd9d3b60740904c826b40612e1f05';


exports.authenticate = (req, res, next) => {
  try {
    const token = req.header("authorization");

    const Id = jwt.verify(token,ammananna );
    console.log(Id)
    User.findByPk(Id)
      .then((user) => {
        //console.log(JSON.stringify(user))
        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(401).json({message:"unauthorized login again"})
      });
  } catch (err) {
    
    res.status(404).json({ success: false,message:"not able to authorize! login again" });
  }
};