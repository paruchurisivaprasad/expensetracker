const User=require('../models/user');
const ForgotPassword=require('../models/forgot');
const bcrypt=require('bcrypt');
const uuid=require('uuid');
const express=require('express');
const router=express.Router();

let bodyParser = require("body-parser");
router.use(bodyParser.json());


router.post('/forgot/password',async (req,res)=>{
let {email}=req.body;
console.log(email);

try {
  let result= await User.findOne({where:{email:email}})
    if(result){
        let id=uuid.v4();
let userId=result.id;
        ForgotPassword.create({id,userId})
        .then(result=>{
            res.send(
                `<a href="http://localhost:8400/reset/password/${id}">reset link</a>
                `
            )
        })
        .catch(err=>{
            res.json({err,msg:false})

        })
    }
    else{
res.json(result);
    }
    
} catch (err) {
    res.status(404).json({err,love:false})
}
});

router.get('/reset/password/:id', async (req,res)=>{


    let id=req.params.id;

    console.log(id);
    ForgotPassword.findOne({where:{id:id}})
    .then(result=>{

  if(result){

    if(result.active==false){
        res.send(`<h1>link expired</h1>`);
    }
    result.update({active:false});


res.send(`<html>
       <script>
           function formsubmitted(e){
               e.preventDefault();
               console.log('called')
           }
       </script>
       <body>
       <form action="/updatepassword/${id}" method="get">
           <label for="newpassword">Enter New password</label>
           <input name="pwd" type="password" required></input>
           <button>reset password</button>
       </form>
       </body>
   </html>`);


  }
  else{
    res.json("not found")
  }

    })
    .catch(err=>{
        console.log(err);
    })
});

router.get('/updatepassword/:id', async (req,res)=>{
    console.log(req.params.id);
    console.log(req.query.pwd);
    const id = req.params.id;
    const pwd = req.query.pwd;


    ForgotPassword.findOne({where:{id:id}})
    .then(result=>{


        User.findOne({where:{id:result.userId}})
        .then(async (user)=>{


            if(user){
                let password=await bcrypt.hash(pwd,10);

                user.update({password:password})
                .then(()=>{

                    res.send(`<h1>password successfully changed</h1>`)

                })
                .catch(err=>{
                    console.log(err);
                })

            }
        })
    })
});




module.exports=router;