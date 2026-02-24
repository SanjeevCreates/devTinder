const express = require('express');

const connectDB = require('./config/database');

const app = express();

const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');

const profileRouter = require('./routes/profile');

const requestRouter = require('./routes/request');

// express.json() is a middleware that which is used to convert the incomming json data via request to javaScript object because express cannot undestands JSON
// and we are using it in app.use() without and specific routes hence it works for all the route handlers and middlewares 
app.use(express.json());

//cookie-parser is an Express.js middleware used to read and parse cookies that come from the client (browser) in HTTP requests.
app.use(cookieParser());


app.use('/', authRouter);

app.use('/', profileRouter);

app.use('/', requestRouter);

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





