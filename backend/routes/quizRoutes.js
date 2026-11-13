const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    saveQuizResult,
    getQuizHistory
} = require("../controllers/quizController");

const router = express.Router();

// Save quiz result
router.post("/quiz/result", protect, saveQuizResult);

// Get quiz history
router.get("/quiz/history", protect, getQuizHistory);

module.exports = router;