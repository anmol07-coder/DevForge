const User = require("../models/user.model");
const userService = require("../services/user.service");
const AppError = require("../utils/AppError");
const path = require("path");

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
                    avatar: user.avatar? `/uploads/avatars/${path.basename(user.avatar)}`: null,
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
                    avatar: user.avatar? `/uploads/avatars/${path.basename(user.avatar)}`: null,
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

const uploadAvatar = async(req , res , next) =>{
    try{
        if(!req.file){
            throw new AppError(
                "Please upload an image.",
                400
            );
        }

        const updatedUser = await userService.uploadAvatar(
            req.user._id,
            req.file.path
        );

        res.status(200).json({
            success: true,
            message: "Avatar uploaded successfully.",
            data: {
                avatar: `/uploads/avatars/${path.basename(updatedUser.avatar)}`
            }
        });
    }
    catch(err){
        next(err)
    }
}

const deleteAvatar = async(req , res , next) =>{
    try{
        const updatedUser = await userService.deleteUserAvatar(req.user._id);

        res.status(200).json({
            success: true,
            message: "Avatar deleted successfully",
            data: {
                avatar: updatedUser.avatar
            }
        });
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    getMyProfile,
    updateMyProfile,
    uploadAvatar,
    deleteAvatar
}