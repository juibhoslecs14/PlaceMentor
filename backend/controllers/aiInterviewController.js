
require("dotenv").config();

const evaluateInterview = async (req, res) => {
    try {
        // Check Gemini API key
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                message: "Gemini API key is missing. Check your .env file."
            });
        }

        // Import Gemini SDK
        const { GoogleGenAI } = await import("@google/genai");

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        // Receive interview details
        const {
            interviewType,
            jobRole,
            difficulty,
            interviewMode,
            answers
        } = req.body;

        // Validate input
        if (
            !interviewType ||
            !difficulty ||
            !Array.isArray(answers) ||
            answers.length === 0
        ) {
            return res.status(400).json({
                message: "Interview type, difficulty and answers are required."
            });
        }

        // Prepare interview prompt
        const interviewPrompt = `
You are an expert technical placement interviewer.

Evaluate a college student's mock interview fairly and professionally.

INTERVIEW DETAILS:
Interview Type: ${interviewType}
Job Role: ${jobRole || "Software Developer"}
Difficulty: ${difficulty}
Interview Mode: ${interviewMode || "practice"}

DIFFICULTY GUIDELINES:
Easy: Focus on basic concepts and simple explanations.
Medium: Expect good understanding and practical examples.
Hard: Expect deeper knowledge, problem-solving and detailed explanations.

EVALUATION RULES:

1. Evaluate every supplied question and answer.
2. Do not invent missing answers or information.
3. Judge answer quality, not answer length.
4. Be fair to a college student.
5. Give specific and helpful improvement suggestions.

For HR questions, evaluate:
- Relevance
- Communication
- Confidence
- Professionalism
- Examples and clarity

For technical questions, evaluate:
- Technical correctness
- Completeness
- Relevance to the selected job role
- Problem-solving
- Explanation quality

SCORING:
- Each question score must be between 0 and 10.
- Overall score must be between 0 and 100.
- Communication, confidence, professionalism and clarity must be percentages.
- An unanswered question should receive an appropriate low score.

Return ONLY valid JSON in this exact structure:

{
    "overallScore": 75,
    "communication": "75%",
    "confidence": "70%",
    "professionalism": "80%",
    "clarity": "85%",
    "recommendation": "Your overall interview feedback.",
    "questionEvaluations": [
        {
            "questionNumber": 1,
            "score": 8,
            "feedback": "Your answer was relevant. Include a practical example."
        }
    ]
}

INTERVIEW ANSWERS:

${JSON.stringify(answers, null, 2)}
`;

        // Generate evaluation using Gemini
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: interviewPrompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.3
            }
        });

        const output = response.text;

        if (!output) {
            throw new Error("Gemini returned an empty response.");
        }

        // Parse Gemini response
        let evaluation;

        try {
            evaluation = JSON.parse(output);
        } catch (error) {
            console.error("Invalid Gemini JSON:", output);

            return res.status(500).json({
                message: "Gemini returned an invalid evaluation format."
            });
        }

        // Validate overall score
        if (
            typeof evaluation.overallScore !== "number" ||
            evaluation.overallScore < 0 ||
            evaluation.overallScore > 100
        ) {
            throw new Error("Invalid overall score.");
        }

        // Validate percentage fields
        const percentageFields = [
            "communication",
            "confidence",
            "professionalism",
            "clarity"
        ];

        for (const field of percentageFields) {
            if (
                typeof evaluation[field] !== "string" ||
                !/^(100|[0-9]{1,2})%$/.test(evaluation[field])
            ) {
                throw new Error(`Invalid ${field} percentage.`);
            }
        }

        // Validate recommendation
        if (
            typeof evaluation.recommendation !== "string" ||
            !Array.isArray(evaluation.questionEvaluations)
        ) {
            throw new Error("Incomplete evaluation received.");
        }

        // Validate individual question feedback
        if (evaluation.questionEvaluations.length !== answers.length) {
            throw new Error("Gemini returned an incorrect number of question evaluations.");
        }

        for (const item of evaluation.questionEvaluations) {
            if (
                typeof item.score !== "number" ||
                item.score < 0 ||
                item.score > 10 ||
                typeof item.feedback !== "string"
            ) {
                throw new Error("Invalid question evaluation received.");
            }
        }

        // Send evaluation to frontend
        return res.status(200).json(evaluation);

    } catch (error) {
        console.error("Gemini evaluation error:", error);

        return res.status(500).json({
            message: "Unable to evaluate interview using Gemini.",
            error: error.message
        });
    }
};

/* =========================================================
   AI RESUME SUMMARY GENERATOR
   ========================================================= */

const generateResumeSummary = async (req, res) => {
    try {

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                message: "Gemini API key is missing."
            });
        }

        const {
            fullName,
            degree,
            college,
            graduationYear,
            cgpa,
            technicalSkills,
            tools,
            softSkills,
            projectTitle,
            projectTech,
            projectDescription,
            certification,
            certOrganization,
            company,
            role,
            experienceDescription,
            achievements,
            careerInterests,
            preferredRole
        } = req.body;

        // Check whether sufficient information is provided.
        const hasDetails = [
            degree,
            technicalSkills,
            tools,
            projectTitle,
            experienceDescription,
            careerInterests,
            preferredRole
        ].some(value => value && String(value).trim());

        if (!hasDetails) {
            return res.status(400).json({
                message: "Please enter some education, skills, project or career details first."
            });
        }

        const { GoogleGenAI } = await import("@google/genai");

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const prompt = `
You are an expert professional resume writer.

Write a personalized professional summary for a college student.

Use the following information:

Name: ${fullName || "Not provided"}
Degree: ${degree || "Not provided"}
College: ${college || "Not provided"}
Graduation Year: ${graduationYear || "Not provided"}
CGPA: ${cgpa || "Not provided"}

Technical Skills: ${technicalSkills || "Not provided"}
Tools: ${tools || "Not provided"}
Soft Skills: ${softSkills || "Not provided"}

Project: ${projectTitle || "Not provided"}
Project Technologies: ${projectTech || "Not provided"}
Project Description: ${projectDescription || "Not provided"}

Certification: ${certification || "Not provided"}
Certification Organization: ${certOrganization || "Not provided"}

Company: ${company || "Not provided"}
Experience Role: ${role || "Not provided"}
Experience Description: ${experienceDescription || "Not provided"}

Achievements: ${achievements || "Not provided"}

Career Interests: ${careerInterests || "Not provided"}
Preferred Job Role: ${preferredRole || "Not provided"}

INSTRUCTIONS:

1. Create a unique and personalized professional summary.
2. Consider the student's career interests and preferred job role.
3. Highlight relevant education, skills and projects.
4. Include strengths only when supported by the provided information.
5. Do not invent work experience, certifications or achievements.
6. Use professional but simple English.
7. Write in third person or professional resume style without using "I".
8. Keep the summary between 60 and 100 words.
9. Do not include a heading, introduction or explanation.
10. Return only the professional summary text.
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                temperature: 0.7
            }
        });

        const summary = response.text?.trim();

        if (!summary) {
            throw new Error("Gemini returned an empty summary.");
        }

        return res.status(200).json({
            message: "Professional summary generated successfully.",
            summary
        });

    } catch (error) {

        console.error("Resume summary error:", error);

        return res.status(500).json({
            message: "Unable to generate resume summary.",
            error: error.message
        });

    }
};
module.exports = {
    evaluateInterview,
    generateResumeSummary
};
