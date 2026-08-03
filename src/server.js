const app = require("./app.js");
const env = require("./config/env.js");
const connectDatabase = require("./config/database");

const startServer = async()=>{
    try{
        await connectDatabase();
        app.listen(env.port , ()=>{
            console.log(`${env.appName} running in ${env.nodeEnv} mode on port number ${env.port}`);
        });
    }
    catch(err){
        console.error("Failed to start DevForge:", error);
        process.exit(1);
    }
}

startServer();