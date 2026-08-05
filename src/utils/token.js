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

const generateRefreshToken = (userId) =>{
    return jwt.sign(
        {
            userId
        },
        env.jwtRefreshSecret,
        {
            expiresIn : env.jwtRefreshExpiresIn
        }
    )
}

const verifyRefreshToken = (token)=>{
    return jwt.verify(token , env.jwtRefreshSecret);
}

module.exports = {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken
};