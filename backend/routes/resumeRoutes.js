const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    saveResume,
    getResume,
    deleteResume
} = require("../controllers/resumeController");

const router = express.Router();

// Save or update resume
router.post("/resume", protect, saveResume);

// Get logged-in user's resume
router.get("/resume", protect, getResume);

// Delete logged-in user's resume
router.delete("/resume", protect, deleteResume);

module.exports = router;