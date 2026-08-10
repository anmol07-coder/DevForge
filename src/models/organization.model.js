const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 100
    },

    slug : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500,
        default: ""
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{
    timestamps : true
});

const Organization = mongoose.model("Organization" , organizationSchema);
module.exports = Organization;