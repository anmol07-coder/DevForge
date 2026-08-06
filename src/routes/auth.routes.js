const authController = require("../controllers/auth.controller.js");
const authenticate = require("../middlewares/auth.middleware.js");
const validate = require("../middlewares/validate.middleware.js");

const { registerSchema , loginSchema , forgotPasswordSchema , resetPasswordSchema} = require("../validators/auth.validator.js");

const express = require("express");
const router = express.Router();

router.post("/register" , validate(registerSchema) , authController.register);
router.post("/login" , validate(loginSchema) , authController.login);
router.get("/me" , authenticate , authController.getCurrentUser);
router.post("/refresh" , authController.refresh);
router.post("/logout" , authController.logout);
router.get("/verify-email/:token" , authController.verifyEmail);
router.post("/forgot-password" , validate(forgotPasswordSchema) , authController.forgotPassword);
router.post("/reset-password/:token" , validate(resetPasswordSchema) , authController.resetPassword);

module.exports = router;