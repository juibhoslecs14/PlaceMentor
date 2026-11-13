
const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// PROTECTED PROFILE ROUTE
router.get("/profile", protect, async (req, res) => {

    try {

        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            message: "Profile fetched successfully!",
            user
        });

    } catch (error) {

        console.error("Profile error:", error);

        res.status(500).json({
            message: "Unable to fetch profile."
        });

    }

});

module.exports = router;
