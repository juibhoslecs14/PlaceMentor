const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    saveMockInterview,
    getMockInterviewHistory
} = require("../controllers/mockInterviewController");

const router = express.Router();

// Save mock interview result
router.post(
    "/mock-interview/result",
    protect,
    saveMockInterview
);

// Get logged-in user's mock interview history
router.get(
    "/mock-interview/history",
    protect,
    getMockInterviewHistory
);

module.exports = router;