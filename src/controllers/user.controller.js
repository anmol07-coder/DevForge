const userService = require("../services/user.service");

const getMyProfile = async(req , res , next) =>{
    try{
        const user = await userService.getUserProfile(req.user._id);

        res.status(200).json({
            success : true,
            data : {
                user : {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    bio:user.bio,
                    skills:user.skills,
                    socialLinks:user.socialLinks,
                    role:user.role,
                    isEmailVerified:user.isEmailVerified,
                    createdAt:user.createdAt,
                    updatedAt:user.updatedAt
                }
            }
        })
    } 
    catch(err){
        next(err);
    }
}

const updateMyProfile = async (req,res,next)=>{
    try{
        const updatedUser = await userService.updateUserProfile( req.user._id , req.body);

        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:{
                user:{
                    id:updatedUser._id,
                    name:updatedUser.name,
                    email:updatedUser.email,
                    bio:updatedUser.bio,
                    skills:updatedUser.skills,
                    socialLinks:updatedUser.socialLinks,
                    role:updatedUser.role,
                    isEmailVerified:updatedUser.isEmailVerified,
                    createdAt:updatedUser.createdAt,
                    updatedAt:updatedUser.updatedAt
                }
            }
        });
    }
    catch(err){
        next(err);
    }

};

module.exports = {
    getMyProfile,
    updateMyProfile
}