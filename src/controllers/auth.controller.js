const authService = require("../services/auth.service.js");
const env = require("../config/env");
const { verifyAccessToken , verifyRefreshToken } = require("../utils/token.js");

const register = async(req , res , next)=>{
    try{
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            success : true,
            message : `Welcome to DevForge ${user.name}`,
            data : {
                user
            }
        });
    }
    catch(err){
        next(err);
    }
}

const login = async(req , res , next)=>{
    try{
        const {user , accessToken , refreshToken} = await authService.loginUser(req.body);
        
        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly : true,
                secure : env.nodeEnv === "production",
                sameSite : "strict",
                maxAge : 7*24*60*60*1000
            }
        )

        res.status(201).json({
            success : true,
            message : `Welcome to DevForge ${user.name}`,
            data : {
                user,
                accessToken,
                tokenType : "Bearer"
            }
        });
    }
    catch(err){
        next(err);
    }
}

const getCurrentUser = async(req , res , next) =>{
    try{
        const user = req.user;

        res.status(200).json({
            success : true,
            data : {
                user : {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isEmailVerified: user.isEmailVerified,
                    createdAt: user.createdAt
                }
            }
        })
    }

    catch(err){
        next(err); 
    }
}

const refresh = async(req , res , next) =>{
    try{
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new AppError(
                "Refresh token is required",
                401
            );
        }

        const decoded = verifyRefreshToken(refreshToken);

        const accessToken = await authService.refreshAccessToken(decoded.userId);

        res.status(200).json({
            success : true,
            message : "Access token refreshed successfully",
            data : {
                accessToken,
                tokenType : "Bearer"
            }
        }
    );

    }

    catch(err){
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return next(
                new AppError(
                    "Invalid or expired refresh token",
                    401
                )
            );
        }

        next(error);
    }
}

const logout = async(req , res , next) =>{
    try{
        res.clearCookie(
            "refreshToken",
            {
                httpOnly : true,
                secure : env.nodeEnv === "production",
                sameSite : "strict"
            }
        );

        res.status(200).json({
            success : true,
            message : "Logout successful"
        });
    }

    catch(err){
        next(err);
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const user =
            await authService.verifyEmail(
                req.params.token
            );

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {register , login , getCurrentUser , refresh , logout , verifyEmail};
