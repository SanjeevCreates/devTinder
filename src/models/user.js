const mongoose = require('mongoose');

const validator = require('validator');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{ 
        type: String,
        required: true,
        minLength: 3,
        maxLength:50
    },
    lastName:{
        type:String,
        minLength: 3,
        maxLength:50,
    },
    emailId:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if (!validator.isEmail(value))
                throw new Error("Invaild Email");
        }
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if (!validator.isStrongPassword(value))
                throw new Error("Enter a strong password");
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default: "https://thumbs.dreamstime.com/b/default-photo-placeholder-half-length-portrait-photo-avatar-gray-color-default-photo-placeholder-116847356.jpg?w=576",
        validate(value){
            if (!validator.isURL(value))
                throw new Error("Invaid photo url");
        }
    },
    about:{
        type:String,
        default: 'This is a default about of the user',
    },
    skills:{
        type:[String],
    }
},{timestamps:true});

//schema methods for JWT generation and password validation

userSchema.methods.getJWT = async function (){
    const user = this 
    const token = await jwt.sign({_id:user._id},"s9F$kL2@qP8!Zx#M4rT0WnE7D",{expiresIn:'1d',});
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);



//