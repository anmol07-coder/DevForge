const app = require("./app.js");
const env = require("./config/env.js")

app.listen(env.port , ()=>{
    console.log(`${env.appName} running in ${env.nodeEnv} mode on port number ${env.port}`);
});