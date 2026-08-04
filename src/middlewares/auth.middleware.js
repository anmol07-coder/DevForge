const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const { verifyAccessToken } = require("../utils/token");

const authenticate = async(req , res , next) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new AppError(
                "Authentication required",
                401
            )
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);

        const user = await User.findById( decoded.userId );

        if (!user) {
            throw new AppError(
                "User associated with this token no longer exists",
                401
            );
        }

        req.user = user;
        next();
    }
    catch(err){
        if (
            err.name === "JsonWebTokenError" ||
            err.name === "TokenExpiredError"
        ) {
            return next(
                new AppError(
                    "Invalid or expired authentication token",
                    401
                )
            );
        }
    }
}

module.exports = authenticate;