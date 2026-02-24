const express = require('express');

const User = require('../models/user');

const {userAuth} = require('../middleware/auth');

const profileRouter = express.Router();

profileRouter.get('/profile',userAuth,async(req,res)=>{
try{
  const user = req.user;
  res.send(user);
} catch(err){
  throw new Error("Error: "+ err.message);
}
});

module.exports = profileRouter;