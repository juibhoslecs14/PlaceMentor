
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const quizRoutes = require("./routes/quizRoutes");
const mockInterviewRoutes = require("./routes/mockInterviewRoutes");
const aiInterviewRoutes = require("./routes/aiInterviewRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", resumeRoutes);
app.use("/api", quizRoutes);
app.use("/api", mockInterviewRoutes);
app.use("/api", aiInterviewRoutes);
app.use("/api", courseRoutes);

// Frontend folder
const frontendPath = path.join(__dirname, "..");

// Serve frontend files
app.use(express.static(frontendPath));

// Main page
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`PlaceMentor running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    });
