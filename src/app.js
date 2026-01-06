const express = require('express');

const connectDB = require('./config/database');

const User = require('./models/user');

const app = express();

connectDB()
    .then(()=>{
    console.log("Database connected successfully...");
    app.listen(3000,() => {
    console.log("Server is running on port 3000");
  });
    })
    .catch((err)=>{
    console.log("Database connection failed", err);
    });


app.post('/signup',async(req,res)=>{

  const user = new User({
    firstName: "John",
    lastName: "Doe",
    emaiId: "john.doe@example.com",
    password: "password123",
    age: 25,
    gender: "Male"
  });

  try{
    await user.save();
    res.send("User signed up successfully");
  }
  catch(err){
    res.status(400).send("Bad Reuquest"+err.message);
  }

})


