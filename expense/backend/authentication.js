

const jwt = require("jsonwebtoken");
const User = require('./models/user');

exports.authenticate = (req, res, next) => {
  try {
    const token = req.header("authorization");

    const Id = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(Id)
    User.findByPk(Id)
      .then((user) => {
        //console.log(JSON.stringify(user))
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    res.status(404).JSON({ success: false });
  }
};