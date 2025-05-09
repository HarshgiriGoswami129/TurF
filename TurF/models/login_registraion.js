const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        uniq:true,
    },
    birthDate:{
        type:String,
        require:true,
    },
    phoneNumber:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
});

const REGISTRATION = mongoose.model("registration",registrationSchema);

const loginSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
});

const LOGIN =mongoose.model("login",loginSchema);

module.exports = {
    REGISTRATION,
    LOGIN
}