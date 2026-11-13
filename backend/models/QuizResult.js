
const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        score: {
            type: Number,
            required: true,
            min: 0
        },

        totalQuestions: {
            type: Number,
            required: true,
            min: 1
        },

        percentage: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("QuizResult", quizResultSchema);
