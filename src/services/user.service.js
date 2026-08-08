const User = require("../models/user.model.js");
const AppError = require("../utils/AppError");
const fs = require("fs/promises");
const path = require("path");

const getUserProfile = async(userId) =>{
    const user = await User.findById(userId);
    if(!user){
        throw new AppError(
            "User not found",
            404
        )
    }

    return user;
} 

const updateUserProfile = async(userId , profileData) =>{
    const allowedFields = [
        "name",
        "bio",
        "skills",
        "socialLinks"
    ];

    const updateData = {};

    for(const field of allowedFields){
        if(profileData[field] !== undefined){
            updateData[field] = profileData[field];
        }
    }

    const updatedUser = await User.findByIdAndUpdate(userId,
        updateData,
        {
            new : true,
            runValidators : true
        }
    );

    if (!updatedUser) {

        throw new AppError(
            "User not found",
            404
        );

    }

    return updatedUser;
    

}

const uploadAvatar = async(userId , avatarPath) =>{
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(
            "User not found",
            404
        );
    }

    const oldAvatarPath = user.avatar;
    user.avatar = avatarPath;
    await user.save();

    if(oldAvatarPath){
        try{
            const oldAvatarAbsolutePath = path.resolve(oldAvatarPath);
            await fs.unlink(oldAvatarAbsolutePath);
        }
        catch(err){
            console.error("Failed to delete old avatar:",error);
        }
    }

    return user;
}

const deleteUserAvatar = async(userId) =>{
    const user = await User.findById(userId);

    if(!user){
        throw new AppError(
            "User not found",
            404
        );
    }

    if(!user.avatar){
        throw new AppError(
            "No avatar exists",
            400
        );
    }

    const avatarPath = path.join(
        __dirname,
        "..",
        "..",
        user.avatar
    );

    try{
        await fs.unlink(avatarPath);
    }
    catch(err){
        next(err);
    }

    user.avatar = "";
    await user.save();
    return user;
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    uploadAvatar,
    deleteUserAvatar
}