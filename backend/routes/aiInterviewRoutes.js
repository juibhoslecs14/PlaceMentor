
const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    evaluateInterview,
    generateResumeSummary
} = require("../controllers/aiInterviewController");

console.log("Protect:", typeof protect);
console.log("Evaluate:", typeof evaluateInterview);
console.log("Resume:", typeof generateResumeSummary);

const router = express.Router();

// AI Mock Interview Evaluation
router.post(
    "/mock-interview/evaluate",
    protect,
    evaluateInterview
);

// AI Resume Summary Generator
router.post(
    "/resume/generate-summary",
    protect,
    generateResumeSummary
);

module.exports = router;
