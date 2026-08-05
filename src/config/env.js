require("dotenv").config();

const env = {
    port : Number(process.env.PORT) || 5000,
    nodeEnv : process.env.NODE_ENV || development,
    appName : process.env.APP_NAME || "Devforge",
    mongoUri : process.env.MONGODB_URI,
    jwtSecret : process.env.JWT_SECRET,
    jwtExpiresIn : process.env.JWT_EXPIRES_IN || "15m",
    jwtRefreshSecret : process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn : process.env.JWT_REFRESH_EXPIRES_IN || "7d"
};

if(!env.mongoUri){
    throw new Error("MONGODB_URI is required");
}

if (!env.jwtRefreshSecret) {
    throw new Error("JWT_REFRESH_SECRET is required");
}

module.exports = env;