const {z} = require("zod");

const registerSchema = z.object({
    name : z
           .string()
           .trim()
           .min(2 , "Name must contain at leas 2 characters")
           .max(50 , "Name can not exceed more than 50 characters"),

    email : z
            .string()
            .trim()
            .email("Please send a valid email"),

    password : z
               .string()
               .min(8 , "Pasword must contain at least 8 characters ")
               .max(50, "Password can not contain more than 50 characters")
});

const loginSchema = z.object({
    email : z
            .string()
            .trim()
            .email("Please provide a valid email")
            .toLowerCase(),

    password : z
               .string()
               .min(1 , "Password can not be empty")
})

const forgotPasswordSchema = z.object({
    email : z
            .string()
            .trim()
            .email("Please provide a valid email")
            .toLowerCase()
})

const resetPasswordSchema = z.object({
    password : z
                .string()
                .min(8 , "Password must contain at least 8 characters")
                .max(72, "Password cannot exceed 72 characters")
})

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema
};