const express = require("express");
const app = express();

app.use(express.json());

app.get("/" , (req , res) =>{
    res.send("Welcome to devforge API");
});

app.post("/test" , (req , res)=>{
    console.log(req.body);

    res.json({
        message : "Data received successfully",
        data : req.body
    });
});

module.exports = app;