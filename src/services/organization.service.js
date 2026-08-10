const Organization = require("../models/organization.model");
const AppError = require("../utils/AppError");

const generateSlug = (name) => {

    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

};

const createOrganization = async(userId , organizationData) =>{
    
    const slug = generateSlug(organizationData.name);
    
    const existingOrganization = await Organization.findOne({
        slug
    });

    if(existingOrganization){
        throw new AppError(
            "An organization with this name already exists.",
            409
        )
    }

    const organization = await Organization.create({
        name : organizationData.name,
        slug,
        description : organizationData.description || " ",
        owner : userId
    })

    return organization;
}

module.exports = {
    createOrganization
}