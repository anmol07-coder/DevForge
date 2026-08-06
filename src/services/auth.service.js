const AppError = require("../utils/AppError");
const User = require("../models/user.model");
const { generateVerificationToken, hashVerificationToken } = require("../utils/verificationToken");
const { sendEmail } = require("./email.service");
const env = require("../config/env");

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

    const { rawToken , hashedToken } = generateVerificationToken();
    const hashedPassword = await bcrypt.hash(password , 12);

    const user = await User.create({

        name,
        email,
        password : hashedPassword,
        emailVerificationToken : hashedToken,
        emailVerificationExpires : Date.now() + 15 * 60 * 1000

    })

    const verificationUrl = `${env.clientUrl}/verify-email?token=${rawToken}`;

    await sendEmail({
        to: user.email,
        subject: "Verify your DevForge account",
        text:
            `Verify your email using this link: ${verificationUrl}`,
        html: `
            <p>Verify your email:</p>
            <a href="${verificationUrl}">
                Verify Email
            </a>`
    });

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

const verifyEmail = async(token) =>{
    const hashedToken = hashVerificationToken(token);

    const user = await User.findOne({
        emailVerificationToken : hashedToken,
        emailVerificationExpires : {
            $gt : Date.now()
        }
    }).select("+emailVerificationToken +emailVerificationExpires");

    if (!user) {
        throw new AppError(
            "Verification token is invalid or expired",
            400
        );
    }

    user.isEmailVerified = true;

    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    return {
        id: user._id,
        email: user.email,
        isEmailVerified: user.isEmailVerified
    };

}
module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    verifyEmail
}