
require("dotenv").config();

/* =========================================================
   BACKUP RULE-BASED INTERVIEW EVALUATOR
   ========================================================= */

function evaluateWithoutAI(answers) {

    const stopWords = new Set([
        "what", "when", "where", "which", "while", "with",
        "that", "this", "from", "have", "your", "does",
        "explain", "difference", "between", "about", "into",
        "their", "there", "they", "them", "then", "than",
        "used", "using", "purpose", "would", "could", "should"
    ]);

    const questionEvaluations = answers.map((item, index) => {

        const question = String(item.question || "");
        const answer = String(item.answer || "").trim();

        if (!answer) {
            return {
                questionNumber: index + 1,
                score: 0,
                feedback: "No answer provided. Try to attempt every question."
            };
        }

        const words = answer.split(/\s+/).filter(Boolean);

        const questionWords = (
            question.toLowerCase().match(/\b[a-z]{4,}\b/g) || []
        ).filter(word => !stopWords.has(word));

        const answerWords = new Set(
            answer.toLowerCase().match(/\b[a-z]{4,}\b/g) || []
        );

        const matchedWords = questionWords.filter(word =>
            answerWords.has(word)
        ).length;

        const relevance = questionWords.length
            ? matchedWords / questionWords.length
            : 0;

        let score = 0;

        if (words.length >= 5) score = 3;
        if (words.length >= 15) score = 5;
        if (words.length >= 30) score = 7;

        score += Math.round(relevance * 3);
        score = Math.min(10, score);

        let feedback;

        if (score >= 8) {
            feedback =
                "Good attempt. Try adding a practical example to strengthen your answer.";
        } else if (score >= 5) {
            feedback =
                "Your answer has some relevant content. Improve it with more details and examples.";
        } else {
            feedback =
                "Your answer needs more explanation. Include important concepts related to the question.";
        }

        return {
            questionNumber: index + 1,
            score,
            feedback
        };

    });

    const overallScore = Math.round(
        questionEvaluations.reduce(
            (total, item) => total + item.score,
            0
        ) / Math.max(answers.length, 1) * 10
    );

    const answered = answers.filter(item =>
        String(item.answer || "").trim().length > 0
    );

    const averageLength = answered.length
        ? answered.reduce(
            (total, item) =>
                total + item.answer.trim().split(/\s+/).length,
            0
        ) / answered.length
        : 0;

    const percentage = value =>
        `${Math.round(Math.max(0, Math.min(100, value)))}%`;

    return {
        overallScore,

        communication: percentage(averageLength * 2),

        confidence: percentage(
            answered.length / Math.max(answers.length, 1) * 100
        ),

        professionalism: percentage(overallScore),

        clarity: percentage(averageLength * 2),

        recommendation:
            "This report was generated using the backup rule-based evaluation system because AI evaluation was temporarily unavailable. Practise explaining concepts clearly and include relevant examples.",

        questionEvaluations,

        evaluationSource: "rule-based"
    };
}


/* =========================================================
   AI MOCK INTERVIEW EVALUATION
   ========================================================= */

const evaluateInterview = async (req, res) => {

    try {

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

        // Check Gemini API key
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("Gemini API key is missing.");
        }

        // Import Gemini SDK
        const { GoogleGenAI } = await import("@google/genai");

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

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
5. Give specific improvement suggestions.

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

        // Generate evaluation with retry logic
        let response;
        let lastError;

        for (let attempt = 0; attempt < 3; attempt++) {

            try {

                response = await ai.models.generateContent({
                    model: "gemini-3.5-flash-lite",
                    contents: interviewPrompt,
                    config: {
                        responseMimeType: "application/json",
                        temperature: 0.3
                    }
                });

                break;

            } catch (error) {

                lastError = error;

                const status = Number(
                    error.status || error.code
                );

                // Retry only temporary server/rate-limit errors
                if (![429, 500, 502, 503, 504].includes(status)) {
                    throw error;
                }

                console.log(
                    `Gemini attempt ${attempt + 1} failed with status ${status}.`
                );

                if (attempt < 2) {

                    const delay = 1000 * (2 ** attempt);

                    await new Promise(resolve =>
                        setTimeout(resolve, delay)
                    );

                }

            }

        }

        if (!response) {
            throw lastError || new Error("Gemini evaluation failed.");
        }

        // Read Gemini response
        const output = response.text;

        if (!output) {
            throw new Error("Gemini returned an empty response.");
        }

        // Parse JSON
        const evaluation = JSON.parse(output);

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

        // Validate question evaluations
        if (
            evaluation.questionEvaluations.length !== answers.length
        ) {
            throw new Error(
                "Gemini returned an incorrect number of question evaluations."
            );
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

        // Mark AI-generated report
        evaluation.evaluationSource = "gemini";

        return res.status(200).json(evaluation);

    } catch (error) {

        console.error("Gemini evaluation error:", error);

        // Use backup evaluator
        console.log("Using backup rule-based evaluator.");

        const fallback = evaluateWithoutAI(
            Array.isArray(req.body.answers)
                ? req.body.answers
                : []
        );

        return res.status(200).json(fallback);

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

        // Check whether sufficient information is provided
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
                message:
                    "Please enter some education, skills, project or career details first."
            });
        }

        // Import Gemini SDK
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


/* =========================================================
   EXPORT CONTROLLERS
   ========================================================= */

module.exports = {
    evaluateInterview,
    generateResumeSummary
};
