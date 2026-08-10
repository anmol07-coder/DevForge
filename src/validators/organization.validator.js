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
        .optional(),

    logo : z
           .string()
           .trim()
           .url("Please provide a valid URL")
           .trim()
           .optional()

});

const updateOrganizationSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2,"Organization name must be at least 2 characters")
        .max(100,"Organization name cannot exceed 100 characters")
        .optional(),

    description: z
        .string()
        .trim()
        .max(500,"Description cannot exceed 500 characters")
        .optional(),

    logo: z
        .string()
        .url("Logo must be a valid URL")
        .optional()

}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message:"Provide at least one field to update."
    }
);

module.exports = {
    createOrganizationSchema,
    updateOrganizationSchema
}