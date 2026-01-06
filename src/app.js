const express = require('express');

const connectDB = require('./config/database');

const User = require('./models/user');

const app = express();

// express.json() is a middleware that which is used to convert the incomming json data via request to javaScript object because express cannot undestands JSON
// and we are using it in app.use() without and specific routes hence it works for all the route handlers and middlewares 
app.use(express.json());

// connecting the database first and then starting the server is the best practice 
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

  // creating a new instance of user model 
  const user = new User(req.body);

  try{
    await user.save();
    res.send("User signed up successfully");
  }
  catch(err){
    res.status(400).send("Bad Reuquest"+err.message);
  }

});

