const jwt = require("jsonwebtoken");
const env = require("../config/env.js");

const generateAccessToken = (userId , tokenVersion) =>{
    return jwt.sign(
        {
            userId,
            tokenVersion
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

const generateRefreshToken = (userId , tokenVersion) =>{
    return jwt.sign(
        {
            userId,
            tokenVersion
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