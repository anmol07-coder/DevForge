const authController = require("../controllers/auth.controller.js");
const validate = require("../middlewares/validate.middleware.js");

const { registerSchema } = require("../validators/auth.validator.js");

const express = require("express");
const router = express.Router();

router.post("/register" , validate(registerSchema) , authController.register);

module.exports = router;