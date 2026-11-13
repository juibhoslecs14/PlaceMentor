const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        fullName: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            trim: true
        },

        phone: {
            type: String,
            trim: true
        },

        location: {
            type: String,
            trim: true
        },

        linkedin: {
            type: String,
            trim: true
        },

        github: {
            type: String,
            trim: true
        },

        summary: {
            type: String,
            trim: true
        },

        preferredRole: {
    type: String,
    trim: true
},

careerInterests: {
    type: String,
    trim: true
},

    
        degree: {
            type: String,
            trim: true
        },

        college: {
            type: String,
            trim: true
        },

        graduationYear: {
            type: String,
            trim: true
        },

        cgpa: {
            type: String,
            trim: true
        },

        technicalSkills: {
            type: String,
            trim: true
        },

        tools: {
            type: String,
            trim: true
        },

        softSkills: {
            type: String,
            trim: true
        },

        projectTitle: {
            type: String,
            trim: true
        },

        projectTech: {
            type: String,
            trim: true
        },

        projectDescription: {
            type: String,
            trim: true
        },

        projectLink: {
            type: String,
            trim: true
        },

        certification: {
            type: String,
            trim: true
        },

        certOrganization: {
            type: String,
            trim: true
        },

        certYear: {
            type: String,
            trim: true
        },

        company: {
            type: String,
            trim: true
        },

        role: {
            type: String,
            trim: true
        },

        experienceDuration: {
            type: String,
            trim: true
        },

        experienceDescription: {
            type: String,
            trim: true
        },
achievements: {
    type: String,
    trim: true
},

profilePhoto: {
    type: String,
    default: ""
},

resumeTemplate: {
    type: String,
    enum: ["classic", "modern", "minimal"],
    default: "classic"
}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Resume", resumeSchema);