let express=require('express');
let router = express.Router();
let Controllers=require('../controllers/signuplogin');


router.post('/register',Controllers.postuserdata);



module.exports=router;