const express = require('express');

const connectDB = require('./config/database');

const User = require('./models/user');

const {validateSignUpData} = require('./utils/validation');

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

//getting some specific users by emailId
app.get('/user',async(req,res)=>{
  const userMailId = req.body.emailId;
  try{
      const users = await User.find({emailId:userMailId});
      res.send(users);
  } catch(err){
    res.status(400).send('Something went wrong');
  };
})

//getting all the users in the database 

app.get('/feed',async(req,res)=>{
  try{
      const users = await User.find({})
      res.send(users);
  } catch(err){
    res.status(400).send("Something went wrong");
  }

});

//deleting a user by id
app.delete('/deleteuser',async(req,res)=>{
   const userId = req.body.userId;
  try{
      const result = await User.findByIdAndDelete({ _id: userId });
      res.send("User deleted successfully");
  } catch (err){
    res.status(400).send("Something went wrong");
  }
})

//updating a user by id
app.patch('/user/:userId',async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;
  try{
    const ALLOWED_UPDATES = ['photoUrl','about','gender','age','skills'];
    const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(K));
    if(!ALLOWED_UPDATES){
      throw new Error("Update is not allowed");
    }
    if(data?.skills.length>10){
      throw new Error("Skills cannot be greather than 10");
    }
    const user = await User.findByIdAndUpdate({_id:userId},data,{
      returnDocument: true,
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch(err){
    res.send("Something went wrong"+err.message);
  }

})