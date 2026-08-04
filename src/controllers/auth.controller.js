const authService = require("../services/auth.service.js");

const register = async(req , res , next)=>{
    try{
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            success : true,
            message : `Welcome to DevForge ${user.name}`,
            data : {
                user
            }
        });
    }
    catch(err){
        next(err);
    }
}

const login = async(req , res , next)=>{
    try{
        const user = await authService.loginUser(req.body);

        res.status(201).json({
            success : true,
            message : `Welcome to DevForge ${user.name}`,
            data : {
                user
            }
        });
    }
    catch(err){
        next(err);
    }
}
module.exports = {register , login};
