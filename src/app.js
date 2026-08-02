const express = require("express");
const app = express();

const healthRouter = require("./routes/health.routes.js");
const infoRouter = require("./routes/info.routes.js");

const notFound = require("./middlewares/notFound.middleware.js");
const errorHandler = require("./middlewares/error.middleware.js");

app.use(express.json());

app.use("/api/v1/health" , healthRouter);
app.use("/api/vi/info" , infoRouter);

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

app.use(notFound);
app.use(errorHandler);

module.exports = app;