
const mongoose = require("mongoose");

const mockInterviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        interviewType: {
            type: String,
            required: true,
            enum: [
                "HR Interview",
                "Technical Interview",
                "Mixed Interview"
            ]
        },

        jobRole: {
            type: String,
            default: "Software Developer"
        },

        interviewMode: {
            type: String,
            enum: ["practice", "timed"],
            default: "practice"
        },

        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"]
        },

        questionsAttempted: {
            type: Number,
            required: true,
            default: 5
        },

        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        communication: {
            type: String
        },

        confidence: {
            type: String
        },

        professionalism: {
            type: String
        },

        clarity: {
            type: String
        },

        recommendation: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "MockInterview",
    mockInterviewSchema
);
