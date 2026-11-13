const CourseProgress = require("../models/CourseProgress");

// ==========================================
// MARK COURSE AS COMPLETED
// ==========================================

const markCourseCompleted = async (req, res) => {
    try {

        const userId = req.user.userId;

        const {
            topic,
            courseTitle,
            platform
        } = req.body;


        // Check required fields
        if (!topic || !courseTitle || !platform) {

            return res.status(400).json({
                message: "Topic, course title and platform are required"
            });

        }


        // Check if this course already exists for this user
        let progress = await CourseProgress.findOne({
            userId,
            courseTitle
        });


        if (progress) {

            progress.completed = true;
            progress.completedAt = new Date();

            await progress.save();

        }

        else {

            progress = await CourseProgress.create({

                userId,

                topic,

                courseTitle,

                platform,

                completed: true,

                completedAt: new Date()

            });

        }


        res.status(200).json({

            message: "Course marked as completed!",

            progress

        });

    }

    catch (error) {

        console.error(
            "Course completion error:",
            error.message
        );

        res.status(500).json({

            message: "Unable to save course progress"

        });

    }

};


// ==========================================
// GET USER'S COURSE PROGRESS
// ==========================================

const getCourseProgress = async (req, res) => {

    try {

        const userId =
            req.user.userId;


        const progress =
            await CourseProgress
                .find({ userId })
                .sort({ updatedAt: -1 });


        res.status(200).json({

            progress

        });

    }

    catch (error) {

        console.error(
            "Get course progress error:",
            error.message
        );

        res.status(500).json({

            message: "Unable to get course progress"

        });

    }

};


// ==========================================
// CHECK WHETHER A PARTICULAR COURSE
// IS COMPLETED
// ==========================================

const checkCourseCompletion = async (req, res) => {

    try {

        const userId =
            req.user.userId;

        const courseTitle =
            req.params.courseTitle;


        const progress =
            await CourseProgress.findOne({

                userId,

                courseTitle

            });


        res.status(200).json({

            completed:
                progress
                    ? progress.completed
                    : false

        });

    }

    catch (error) {

        console.error(
            "Check course completion error:",
            error.message
        );

        res.status(500).json({

            message: "Unable to check course progress"

        });

    }

};


module.exports = {

    markCourseCompleted,

    getCourseProgress,

    checkCourseCompletion

};