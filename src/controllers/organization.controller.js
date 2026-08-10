const organizationService = require("../services/organization.service");

const createOrganization = async(req , res , next) =>{
    try{
        const organization = await organizationService.createOrganization(
            req.user._id,
            req.body
        )

        return res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data : {
                organization : {
                    id: organization._id,
                    name: organization.name,
                    slug: organization.slug,
                    description: organization.description,
                    logo : organization.logo,
                    owner: organization.owner,
                    createdAt: organization.createdAt,
                    updatedAt: organization.updatedAt
                }
            }
        })
    }
    catch(err){
        next(err);
    }
}

const getOrganization = async(req , res , next) =>{
    try{
        const organization = await organizationService.getOrganization(
            req.params.organizationId
        )

        res.status(201).json({
            success : true,
            data : {
                organization : {
                    id : organization._id,
                    name : organization.name,
                    slug : organization.slug,
                    description : organization.description,
                    logo : organization.logo,
                    owner: organization.owner,
                    createdAt: organization.createdAt,
                    updatedAt: organization.updatedAt
                }
            }
        })
    }
    catch(err){
        next(err);
    }
}

const updateOrganization = async(req , res , next) =>{
    try{
        const organization = await organizationService.updateOrganization(
            req.user._id,
            req.params.organizationId,
            req.body
        )

        res.status(200).json({
            success: true,
            message:
                "Organization updated successfully",
            data: {
                organization: {
                    id: organization._id,
                    name: organization.name,
                    slug: organization.slug,
                    description: organization.description,
                    logo: organization.logo,
                    owner: organization.owner,
                    createdAt: organization.createdAt,
                    updatedAt: organization.updatedAt
                }
            }
        })
    }
    catch(err){
        next(err);
    }

}

module.exports = {
    createOrganization,
    getOrganization,
    updateOrganization
}