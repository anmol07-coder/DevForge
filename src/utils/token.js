const jwt = require("jsonwebtoken");
const env = require("../config/env.js");

const generateAccessToken = (userId) =>{
    return jwt.sign(
        {
            userId
        },
        env.jwtSecret,
        {
            expiresIn : env.jwtExpiresIn
        }
    )
};

module.exports = {
    generateAccessToken
};