const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    isEmailVerified : {
        type : Boolean,
        default : false
    },

    emailVerificationToken : {
        type : String,
        select : false
    },

    emailVerificationExpires : {
        type : Date,
        select : false
    },

    role : {
        type : String,
        enum: ["member", "admin"],
        default: "member"
    }
},
{
    timestamps : true
});

const User = mongoose.model("User" , userSchema);

module.exports = User;