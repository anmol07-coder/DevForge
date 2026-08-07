const express = require("express");
const authenticate = require("../middlewares/auth.middleware");
const { updateProfileSchema } = require("../validators/user.validator");
const validate = require("../middlewares/validate.middleware");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/me" , authenticate , userController.getMyProfile)
router.patch("/me" , authenticate , validate(updateProfileSchema) , userController.updateMyProfile)

module.exports = router;