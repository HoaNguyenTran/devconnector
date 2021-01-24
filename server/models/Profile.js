const mongoose = require("mongoose");
const {Schema} = mongoose;

// Create schema
const ProfileSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId, 
        ref: "users"
    },

    basic: {
        img: {
            type: String,
        },
        displayEmail: {
            type: Boolean,
            default: false
        },
        location: {
            type: String,
        },
        bio: {
            type: String
        },
        url: {
            type: String
        },
        brand: {
            type: String
        }
    },

    coding: {
        skills: {
            type: String
        },
        learn: {
            type: String
        },
        project: {
            type: String
        },
        available: {
            type: String
        },
    },

    link: {
        education: {
            type: String
        },
        company: {
            type: String
        },
        position: {
            type: String
        },
        companyURL: {
            type: String
        },
        lookingForWork: {
            type: Boolean,
            default: false
        },
        displayLookingForWork: {
            type: Boolean,
            default: false
        },
        recruiterContact: {
            type: Boolean,
            default: false
        }
    }
})

const Profile = mongoose.model("profile", ProfileSchema);


module.exports = Profile;