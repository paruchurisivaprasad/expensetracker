
let bcrypt=require('bcrypt');
let User=require('../models/user');






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
}