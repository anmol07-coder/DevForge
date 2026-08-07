const User = require("../models/user.model.js");
const AppError = require("../utils/AppError");

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

module.exports = {
    getUserProfile,
    updateUserProfile
}