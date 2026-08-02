require("dotenv").config();

const env = {
    port : Number(process.env.PORT) || 5000,
    nodeEnv : process.env.NODE_ENV || development,
    appName : process.env.APP_NAME || "Devforge"
};

module.exports = env;