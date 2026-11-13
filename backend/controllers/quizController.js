
const QuizResult = require("../models/QuizResult");

// Save quiz result
const saveQuizResult = async (req, res) => {
    try {
        const userId = req.user.userId;

        const { score, totalQuestions } = req.body;

        // Validate score and total questions
        if (
            !Number.isInteger(score) ||
            !Number.isInteger(totalQuestions) ||
            totalQuestions <= 0 ||
            score < 0 ||
            score > totalQuestions
        ) {
            return res.status(400).json({
                message: "Invalid quiz score or total questions"
            });
        }

        // Calculate percentage
        const percentage = Math.round(
            (score / totalQuestions) * 100
        );

        // Create quiz result
        const quizResult = new QuizResult({
            userId,
            score,
            totalQuestions,
            percentage
        });

        await quizResult.save();

        return res.status(201).json({
            message: "Quiz result saved successfully!",
            result: quizResult
        });

    } catch (error) {
        console.error("Save quiz result error:", error.message);

        return res.status(500).json({
            message: "Unable to save quiz result"
        });
    }
};


// Get logged-in user's quiz history
const getQuizHistory = async (req, res) => {
    try {
        const userId = req.user.userId;

        const results = await QuizResult
            .find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            results
        });

    } catch (error) {
        console.error("Get quiz history error:", error.message);

        return res.status(500).json({
            message: "Unable to get quiz history"
        });
    }
};


// Export controller functions
module.exports = {
    saveQuizResult,
    getQuizHistory
};
