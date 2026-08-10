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
        logo : organizationData.logo || "",
        owner : userId
    })

    return organization;
}

const getOrganization = async(organizationId)=>{
    const organization = await Organization.findById(organizationId);

    if(!organization){
        throw new AppError(
            "Organization not found",
            404
        );
    }

    return organization;
}

const ensureOrganizationOwner = (organization , userId )=>{
    if(organization.owner.toString() !== userId.toString()){
        throw new AppError(
            "You are not authorized to modify this organization.",
            403
        )
    }
}

const updateOrganization = async(userId , organizationId , organizationData)=>{
    const organization = await Organization.findById(organizationId);

    if(!organization){
        throw new AppError(
            "Organization not found",
            404
        )
    }

    ensureOrganizationOwner(organization , userId);

    const allowedFields = [
        "name",
        "description",
        "logo"
    ]

    const updateData = {};
    for(const field of allowedFields){
        if(organizationData[field] !== undefined){
            updateData[field] = organizationData[field];
        }
    }

    if(updateData.name){
        updateData.slug = generateSlug(updateData.name);
    }

    const updatedOrganization  = await Organization.findByIdAndUpdate(
        organizationId,
        updateData,
        {
            returnDocument : "after",
            runValidators : true
        }
    )

    if (!updatedOrganization) {
        throw new AppError(
            "Organization not found",
            404
        );
    }

    return updatedOrganization;
}

module.exports = {
    createOrganization,
    getOrganization,
    ensureOrganizationOwner,
    updateOrganization
}