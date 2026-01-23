const jwt = require('jsonwebtoken');

const User = require('../models/user');


const userAuth = async(req,res,next) => {
    try{
            const {token} = req.cookies;

    if(!token){
        throw new Error("Invaid Token...");
    };

    const decodedObj = jwt.verify(token, "s9F$kL2@qP8!Zx#M4rT0WnE7D");

    const {_id} = decodedObj;

    const user = await User.findById(_id);

    if(!user){
        throw new Error("User Not Found");
    };
    req.user = user;
    next();
    } catch(err){
        res.status(400).send("Error : " + err.message);
    }
};

module.exports = {
    userAuth,
}