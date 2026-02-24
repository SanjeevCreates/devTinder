const express = require('express');

const {validateSignUpData} = require('../utils/validation');

const User = require('../models/user');

const bcrypt = require('bcrypt');

const authRouter = express.Router();

//signup api
authRouter.post('/signup',async(req,res)=>{
  try{
    // validation of data at API level although we kept a schema level validation
    validateSignUpData(req);
    const {firstName, lastName, emailId, password} = req.body;
    // Encrypt the password 
    const passwordHash = await bcrypt.hash(password,10)
    // creating a new instance of user model 
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User signed up successfully");
  }
  catch(err){
    res.status(400).send("Bad Reuquest"+err.message);
  }

});

// login api 
authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //generate a JWT 
      const token = await user.getJWT();
      
      res.cookie("token", token);
      res.send("Login Succuessful");
    } else {
      throw new Error("Invalid Credentails");
    }

  } catch (err) {
    res.send("ERROR : " + err.message);
  }
});


module.exports = authRouter
