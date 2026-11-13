
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            college,
            course,
            department,
            profileInfo
        } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required."
            });
        }

        // Validate input types
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Please enter valid information."
            });
        }

        // Clean and normalize input
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        // Check empty values
        if (!cleanName || !cleanEmail) {
            return res.status(400).json({
                message: "Name and email cannot be empty."
            });
        }

        // Validate email format
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must contain at least 6 characters."
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            email: cleanEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        // Hash password using bcryptjs
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create new user
        const user = new User({
            name: cleanName,
            email: cleanEmail,
            password: hashedPassword,
            college,
            course,
            department,
            profileInfo
        });

        // Save user in MongoDB
        await user.save();

        return res.status(201).json({
            message: "Account created successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                course: user.course,
                department: user.department
            }
        });

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        return res.status(500).json({
            message: "Unable to register. Please try again."
        });
    }
};


// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        // Validate input types
        if (
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Please enter valid login details."
            });
        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {
            console.error(
                "JWT_SECRET is missing from .env"
            );

            return res.status(500).json({
                message: "Server authentication is not configured."
            });
        }

        // Normalize email
        const cleanEmail =
            email.trim().toLowerCase();

        // Find user in MongoDB
        const user = await User.findOne({
            email: cleanEmail
        });
        console.log("User found:", !!user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        console.log("Password matches:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Send successful login response
        return res.status(200).json({
            message: "Login successful!",
            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                course: user.course,
                department: user.department
            }
        });

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({
            message: "Unable to login. Please try again."
        });
    }
};


// ==========================================
// EXPORT FUNCTIONS
// ==========================================

module.exports = {
    registerUser,
    loginUser
};
