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

    passwordResetToken : {
        type : String,
        select : false
    },

    passwordResetExpires : {
        type : Date,
        select : false
    },

    tokenVersion: {
        type: Number,
        default: 0
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