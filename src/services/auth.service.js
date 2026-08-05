const AppError = require("../utils/AppError");
const User = require("../models/user.model");

const { generateAccessToken , generateRefreshToken} = require("../utils/token.js")

const bcrypt = require("bcrypt");

const registerUser = async ({name , email , password}) =>{
    const existingUser = await User.findOne({ email });

    if(existingUser){
        throw new AppError(
            "An account with this email already exists",
            409
        );
    }

    const hashedPassword = await bcrypt.hash(password , 12);

    const user = await User.create({

        name,
        email,
        password : hashedPassword

    })

    return{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt
    };
};

const loginUser = async ({email , password})=>{
    const user = await User.findOne({email}).select("+password");
    
    if(!user){
        throw new AppError(
            "Invalid email or password",
            401
        )
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password
    )

    if (!passwordMatches) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            
        },
        accessToken,
        refreshToken,
        tokenType: "Bearer"
    };
};

const refreshAccessToken = async(userId) =>{
    const user = await User.findById(userId);

    if(!user){
        throw new AppError(
            "User associated with this session no longer exists",
            401
        )
    }

    return generateAccessToken(user._id.toString());
}

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken
}