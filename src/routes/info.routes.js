const express = require("express");
const router = express.Router();
const env = require("../config/env.js");

router.get("/" , (req , res)=>{
    res.status(200).json({
        success: true,
        name: env.appName,
        version: "1.0.0",
        environment: env.nodeEnv
    });
});

module.exports = router;