const Razorpay=require('razorpay');
const Order=require('../models/order');
let aut=require('../authentication');
const express= require('express');
const router=express.Router();
const User=require('../models/user');


router.get('/subscription',aut.authenticate ,async (req,res)=>{

let userId=req.user.id;
try {
  var rzp = new Razorpay({
    key_id: rzp_test_7EozIfQ8l31Aai,
    key_secret: SiiyZJJlLoy4lFY40vjleAGm,
  });
  const amount = 3000;

  rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
    if (err) {
      throw new Error(err);
    }
    Order.create({ orderid: order.id, status: "PENDING" ,userId:userId})
      .then(() => {
        return res.status(201).json({ order, key_id: rzp.key_id });
      })
      .catch((err) => {
        throw new Error(err);
      });
  });
} catch (err) {
  console.log(err);
  res.status(403).json({ message: "Sometghing went wrong", error: err });
}
});

router.post("/updatetransaction", aut.authenticate, async (req, res) => {
  let userId = req.user.id;
  try {
    const { payment_id, order_id } = req.body;
    Order.findOne({ where: { orderid: order_id } })
      .then((order) => {
        order
          .update({ paymentid: payment_id, status: "SUCCESSFUL" })
          .then(() => {
            User.update({ issubcribed: true });
            return res
              .status(202)
              .json({ sucess: true, message: "transaction successful" });
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: err, message: "something  went wrong" });
  }
});




