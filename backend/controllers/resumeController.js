
const Resume = require("../models/resume");

// Save or update the logged-in user's resume
const saveResume = async (req, res) => {
    try {
        const userId = req.user.userId;

        const resumeData = {
            userId,

            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            location: req.body.location,
            linkedin: req.body.linkedin,
            github: req.body.github,

            summary: req.body.summary,
preferredRole: req.body.preferredRole,
careerInterests: req.body.careerInterests,
degree: req.body.degree,

            college: req.body.college,
            graduationYear: req.body.graduationYear,
            cgpa: req.body.cgpa,

            technicalSkills: req.body.technicalSkills,
            tools: req.body.tools,
            softSkills: req.body.softSkills,

            projectTitle: req.body.projectTitle,
            projectTech: req.body.projectTech,
            projectDescription: req.body.projectDescription,
            projectLink: req.body.projectLink,

            certification: req.body.certification,
            certOrganization: req.body.certOrganization,
            certYear: req.body.certYear,

            company: req.body.company,
            role: req.body.role,
            experienceDuration: req.body.experienceDuration,
            experienceDescription: req.body.experienceDescription,

            achievements: req.body.achievements,

            // Profile photo and selected template
            profilePhoto: req.body.profilePhoto || "",
            resumeTemplate: req.body.resumeTemplate || "classic"
        };

        // Check if the user already has a resume
        let resume = await Resume.findOne({ userId });

        if (resume) {
            // Update existing resume
            resume = await Resume.findOneAndUpdate(
                { userId },
                resumeData,
                {
                    new: true,
                    runValidators: true
                }
            );
        } else {
            // Create new resume
            resume = await Resume.create(resumeData);
        }

        res.status(200).json({
            message: "Resume saved successfully!",
            resume
        });

    } catch (error) {
        console.error("Save resume error:", error.message);

        res.status(500).json({
            message: "Unable to save resume"
        });
    }
};


// Get logged-in user's resume
const getResume = async (req, res) => {
    try {
        const userId = req.user.userId;

        const resume = await Resume.findOne({ userId });

        if (!resume) {
            return res.status(404).json({
                message: "No saved resume found"
            });
        }

        res.status(200).json({
            resume
        });

    } catch (error) {
        console.error("Get resume error:", error.message);

        res.status(500).json({
            message: "Unable to get resume"
        });
    }
};


// Delete logged-in user's resume
const deleteResume = async (req, res) => {
    try {
        const userId = req.user.userId;

        const resume = await Resume.findOneAndDelete({ userId });

        if (!resume) {
            return res.status(404).json({
                message: "No resume found"
            });
        }

        res.status(200).json({
            message: "Resume deleted successfully!"
        });

    } catch (error) {
        console.error("Delete resume error:", error.message);

        res.status(500).json({
            message: "Unable to delete resume"
        });
    }
};


module.exports = {
    saveResume,
    getResume,
    deleteResume
};
