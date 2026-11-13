const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        topic: {
            type: String,
            required: true
        },

        courseTitle: {
            type: String,
            required: true
        },

        platform: {
            type: String,
            required: true
        },

        completed: {
            type: Boolean,
            default: false
        },

        completedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "CourseProgress",
    courseProgressSchema
);