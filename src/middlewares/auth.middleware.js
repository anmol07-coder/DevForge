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

        const user = await User.findById( decoded.userId ).select("+tokenVersion");

        if (!user) {
            throw new AppError(
                "User associated with this token no longer exists",
                401
            );
        }

        if (decoded.tokenVersion !== user.tokenVersion){

            throw new AppError(
                "Authentication session is no longer valid",
                401
            )
        }

        req.user = user;
        console.log(req.user._id);
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
        return next(err);
    }

    
}

module.exports = authenticate;