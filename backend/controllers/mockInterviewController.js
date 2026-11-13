
const MockInterview = require("../models/MockInterview");

// Save mock interview result
const saveMockInterview = async (req, res) => {
    try {
        const userId = req.user.userId;

        const {
            interviewType,
            jobRole,
            interviewMode,
            difficulty,
            questionsAttempted,
            score,
            communication,
            confidence,
            professionalism,
            clarity,
            recommendation
        } = req.body;

        if (
            !interviewType ||
            !difficulty ||
            score === undefined
        ) {
            return res.status(400).json({
                message: "Interview type, difficulty and score are required"
            });
        }

        const interview = await MockInterview.create({
            userId,
            interviewType,
            jobRole,
            interviewMode,
            difficulty,
            questionsAttempted: questionsAttempted || 5,
            score,
            communication,
            confidence,
            professionalism,
            clarity,
            recommendation
        });

        res.status(201).json({
            message: "Mock interview result saved successfully!",
            interview
        });

    } catch (error) {
        console.error(
            "Save mock interview error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to save mock interview result"
        });
    }
};


// Get logged-in user's interview history
const getMockInterviewHistory = async (req, res) => {
    try {
        const userId = req.user.userId;

        const interviews = await MockInterview
            .find({ userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            interviews
        });

    } catch (error) {
        console.error(
            "Get mock interview history error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to get mock interview history"
        });
    }
};


module.exports = {
    saveMockInterview,
    getMockInterviewHistory
};
