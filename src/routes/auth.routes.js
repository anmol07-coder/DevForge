const authController = require("../controllers/auth.controller.js");
const validate = require("../middlewares/validate.middleware.js");

const { registerSchema , loginSchema } = require("../validators/auth.validator.js");

const express = require("express");
const router = express.Router();

router.post("/register" , validate(registerSchema) , authController.register);
router.post("/login" , validate(loginSchema) , authController.login);

module.exports = router;