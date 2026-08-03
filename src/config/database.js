const mongoose = require("mongoose");
const env = require("./env");

const connectDatabase = async() =>{
    await mongoose.connect(env.mongoUri);

    console.log("Mongodb is connected succesfully");
    console.log(`${mongoose.connection.host} is our host`);
    
}

module.exports = connectDatabase;