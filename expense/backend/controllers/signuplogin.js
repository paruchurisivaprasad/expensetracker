
let bcrypt=require('bcrypt');
let User=require('../models/user');
let jwt=require('jsonwebtoken');
let ammananna='db43a197a80ce2990dab5eb45d7bf4b25f3d5d1824d856ed4a186930016e85980d1f94e4944005f0a752e895c8dc6d29bcfcd9d3b60740904c826b40612e1f05';





exports.postuserdata=async (req,res)=>{

let {name,email,phonenumber,pwd}=req.body;

let password=await bcrypt.hash(pwd,10);

User.create({
    name,email,phonenumber,password
})
.then(result=>{
res.json({result,suc:true})
})
.catch(err=>{
    res.json(err);
})
};



exports.postlogin = async (req, res) => {
  let { email, pwd } = req.body;

  let user=await User.findAll({where:{email:email}});

  if(user.length>0){
    const dbid=user[0].id;
    const dbemail=user[0].email;
    const dbpassword=user[0].password;
    const dbname=user[0].name;
    const dbphonenumber=user[0].phonenumber;

    const emailpwdmatch=await bcrypt.compare(pwd,dbpassword);


    if (emailpwdmatch) {
      const token = jwt.sign(dbid, process.env.secretkey);
      res.status(200).json({ msg: "login successful", token: token });
    } else {
      res.status(401).json({ msg: "something went wrong" });
    }
  }
  else{
            res.status(404).json({ msg: "user not found" });

  }
  


};