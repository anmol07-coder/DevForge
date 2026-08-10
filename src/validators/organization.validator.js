const { z } = require("zod");

const createOrganizationSchema = z.object({
    name : z
           .string()
           .trim()
           .min(2, "Organization name must be at least 2 characters")
           .max(100, "Organization name cannot exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional()

});

module.exports = {
    createOrganizationSchema
}