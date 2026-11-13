const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// GET logged-in user's profile
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.error("Profile loading error:", error);

        res.status(500).json({
            message: "Unable to load profile."
        });
    }
});


// UPDATE logged-in user's profile
router.put("/profile", protect, async (req, res) => {
    try {
        const { name, college, course, department } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Full name is required."
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            {
                name: name.trim(),
                college: college || "",
                course: course || "",
                department: department || ""
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            message: "Profile updated successfully.",
            user
        });

    } catch (error) {
        console.error("Profile update error:", error);

        res.status(500).json({
            message: "Unable to update profile."
        });
    }
});


// GET logged-in user's settings
router.get("/settings", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("preferences");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            preferences: user.preferences
        });

    } catch (error) {
        console.error("Settings loading error:", error);

        res.status(500).json({
            message: "Unable to load settings."
        });
    }
});


// SAVE logged-in user's settings
router.put("/settings", protect, async (req, res) => {
    try {
        const {
            comfortableLayout,
            learningReminders,
            courseUpdates
        } = req.body;

        const preferences = {};

        if (typeof comfortableLayout === "boolean") {
            preferences["preferences.comfortableLayout"] = comfortableLayout;
        }

        if (typeof learningReminders === "boolean") {
            preferences["preferences.learningReminders"] = learningReminders;
        }

        if (typeof courseUpdates === "boolean") {
            preferences["preferences.courseUpdates"] = courseUpdates;
        }

        if (Object.keys(preferences).length === 0) {
            return res.status(400).json({
                message: "No valid settings were provided."
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: preferences },
            {
                new: true,
                runValidators: true
            }
        ).select("preferences");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            message: "Settings saved successfully!",
            preferences: user.preferences
        });

    } catch (error) {
        console.error("Settings saving error:", error);

        res.status(500).json({
            message: "Unable to save settings."
        });
    }
});


// ==========================================
// GET USER'S LEARNING INTERESTS
// ==========================================

router.get("/learning-interests", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("preferences.learningInterests");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            learningInterests:
                user.preferences?.learningInterests || []
        });

    } catch (error) {
        console.error("Learning interests loading error:", error);

        res.status(500).json({
            message: "Unable to load learning interests."
        });
    }
});


// ==========================================
// SAVE USER'S LEARNING INTERESTS
// ==========================================

router.put("/learning-interests", protect, async (req, res) => {
    try {
        const { learningInterests } = req.body;

        const allowedTopics = [
            "Programming",
            "Web Development",
            "DSA",
            "DBMS",
            "Networks",
            "OS",
            "Aptitude",
            "Communication",
            "Resume",
            "Interview"
        ];

        if (!Array.isArray(learningInterests)) {
            return res.status(400).json({
                message: "Learning interests must be an array."
            });
        }

        const validInterests = [
            ...new Set(learningInterests)
        ];

        if (
            validInterests.some(
                topic =>
                    typeof topic !== "string" ||
                    !allowedTopics.includes(topic)
            )
        ) {
            return res.status(400).json({
                message: "One or more learning interests are invalid."
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            {
                $set: {
                    "preferences.learningInterests": validInterests
                }
            },
            {
                new: true,
                runValidators: true
            }
        ).select("preferences.learningInterests");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            message: "Learning interests saved successfully!",
            learningInterests:
                user.preferences.learningInterests
        });

    } catch (error) {
        console.error("Learning interests saving error:", error);

        res.status(500).json({
            message: "Unable to save learning interests."
        });
    }
});


module.exports = router;