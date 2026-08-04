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


const verifyAccessToken = (token)=>{
    return jwt.verify(token , env.jwtSecret);
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
};