const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    markCourseCompleted,
    getCourseProgress,
    checkCourseCompletion
} = require("../controllers/courseController");

const router = express.Router();

// Mark a course as completed
router.post("/courses/complete", protect, markCourseCompleted);

// Get all course progress for logged-in user
router.get("/courses/progress", protect, getCourseProgress);

// Check whether a specific course is completed
router.get("/courses/check/:courseTitle", protect, checkCourseCompletion);

module.exports = router;