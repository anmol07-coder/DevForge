require("dotenv").config();

const env = {
    port : Number(process.env.PORT) || 5000,
    nodeEnv : process.env.NODE_ENV || development,
    appName : process.env.APP_NAME || "Devforge",
    mongoUri : process.env.MONGODB_URI,
    jwtSecret : process.env.JWT_SECRET,
    jwtExpiresIn : process.env.JWT_EXPIRES_IN || "15m"
};

if(!env.mongoUri){
    throw new Error("MONGODB_URI is required");
}

module.exports = env;