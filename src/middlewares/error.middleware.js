const errorHandler = (err , req , res , next)=>{
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success : req.originalUrl,
        message : err.message
    });

};

module.exports = errorHandler;