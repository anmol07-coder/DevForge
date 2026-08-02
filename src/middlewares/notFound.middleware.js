const notFound = (req , res)=>{
    res.status(400).json({
        success : req.originalUrl,
        message : "Route not found"
    });
};

module.exports = notFound;
