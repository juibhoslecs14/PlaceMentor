
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        college: {
            type: String,
            trim: true
        },

        course: {
            type: String,
            trim: true
        },

        department: {
            type: String,
            trim: true
        },

        profileInfo: {
            type: String,
            trim: true
        },

        // Password reset fields
        resetPasswordToken: {
            type: String,
            default: null
        },

        resetPasswordExpires: {
            type: Date,
            default: null
        },

        // User preferences
        preferences: {
            comfortableLayout: {
                type: Boolean,
                default: false
            },

            learningReminders: {
                type: Boolean,
                default: false
            },

            courseUpdates: {
                type: Boolean,
                default: false
            },

            learningInterests: {
                type: [String],
                default: []
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
