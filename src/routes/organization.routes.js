const organizationController = require("../controllers/organization.controller");
const validate = require("../middlewares/validate.middleware");
const { createOrganizationSchema } = require("../validators/organization.validator");
const authenticate = require("../middlewares/auth.middleware");

const express = require("express");
const router = express.Router();

router.post("/" , authenticate , validate(createOrganizationSchema) , organizationController.createOrganization);

module.exports = router;