const { z } = require("zod");

const updateProfileSchema = z.object({
    name : z
           .string()
           .trim()
           .min(2, "Name must contain at least 2 characters")
           .max(50, "Name cannot exceed 50 characters")
           .optional(),
    
    bio : z
          .string()
          .trim()
          .max(500, "Bio cannot exceed 500 characters")
          .optional(),

    skills : z
             .array(
                z
                .string()
                .trim()
                .min(1 ,"Skill can not be empty")
                .max(50 , "Skill cannot exceed 50 characters")
             )
             .max(20, "You can add at most 20 skills")
             .optional(),

    socialLinks : z
                  .object({
                    github : z.string().url().or(z.literal("")).optional(),
                    linkedin : z.string().url().or(z.literal("")).optional(),
                    website : z.string().url().or(z.literal("")).optional()
                  })
                  .optional()

});

module.exports = {
    updateProfileSchema
}

