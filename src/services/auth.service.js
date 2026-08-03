const AppError = require("../utils/AppError");
const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const registerUser = async ({name , email , password}) =>{
    const existingUser = await User.findOne({ email });

    if(existingUser){
        throw new AppError(
            "An account with this email already exists",
            409
        );
    }

    const hashedPassword = await bcrypt.hash(password , 12);

    const user = await User.create({

        name,
        email,
        password : hashedPassword

    })

    return{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt
    };
};

module.exports = {
    registerUser
}