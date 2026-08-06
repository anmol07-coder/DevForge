const authController = require("../controllers/auth.controller.js");
const authenticate = require("../middlewares/auth.middleware.js");
const validate = require("../middlewares/validate.middleware.js");

const { registerSchema , loginSchema } = require("../validators/auth.validator.js");

const express = require("express");
const router = express.Router();

router.post("/register" , validate(registerSchema) , authController.register);
router.post("/login" , validate(loginSchema) , authController.login);
router.get("/me" , authenticate , authController.getCurrentUser);
router.post("/refresh" , authController.refresh);
router.post("/logout" , authController.logout);
router.get("/verify-email/:token" , authController.verifyEmail);

module.exports = router;