
// ============================================================
// PLACEMENTOR - AI MOCK INTERVIEW
// Role-Based Questions + AI Evaluation
// Practice Mode + Timed Mode
// ============================================================


// ============================================================
// HR QUESTION BANK
// ============================================================

const hrQuestions = [
    "Tell me about yourself.",
    "What are your strengths?",
    "What is your biggest weakness?",
    "Why should we hire you?",
    "Why do you want to work at our company?",
    "Where do you see yourself in 5 years?",
    "Describe a challenge you faced and how you handled it.",
    "Tell me about a time you worked in a team.",
    "How do you handle stress?",
    "What motivates you to do your best?"
];


// ============================================================
// ROLE-BASED TECHNICAL QUESTION BANKS
// ============================================================

const roleQuestions = {

    "Java Developer": [
        "What is Java and what are its main features?",
        "Explain the four principles of Object-Oriented Programming.",
        "What is the difference between JDK, JRE and JVM?",
        "What is the difference between an abstract class and an interface?",
        "Explain method overloading and method overriding.",
        "What is exception handling in Java?",
        "What is the difference between ArrayList and LinkedList?",
        "What is the purpose of constructors in Java?",
        "What is multithreading?",
        "What is the difference between == and equals() in Java?"
    ],

    "Python Developer": [
        "What is Python and why is it popular?",
        "What are the main features of Python?",
        "What is the difference between a list and a tuple?",
        "Explain the use of dictionaries in Python.",
        "What are functions in Python?",
        "What is the difference between == and is?",
        "What is exception handling in Python?",
        "What are Python modules and packages?",
        "What is the purpose of the self keyword in Python?",
        "What is the difference between a for loop and a while loop?"
    ],

    "Web Developer": [
        "What is the difference between HTML and HTML5?",
        "What is the difference between CSS and JavaScript?",
        "What is the DOM in JavaScript?",
        "Explain the difference between let, const and var.",
        "What is responsive web design?",
        "What is the difference between HTTP and HTTPS?",
        "What is an API and how is it used in web development?",
        "What is the difference between frontend and backend development?",
        "What is the purpose of CSS Flexbox?",
        "What is the difference between localStorage and sessionStorage?"
    ],

    "Data Analyst": [
        "What is data analysis?",
        "What is the difference between structured and unstructured data?",
        "What is SQL and why is it used?",
        "What is the difference between WHERE and HAVING in SQL?",
        "What is the difference between INNER JOIN and LEFT JOIN?",
        "What is data cleaning?",
        "What is the difference between mean, median and mode?",
        "How is Excel useful in data analysis?",
        "What is data visualization?",
        "What is the purpose of Python libraries like Pandas and NumPy?"
    ],

    "Software Developer": [
        "What is the Software Development Life Cycle (SDLC)?",
        "What is the difference between a compiler and an interpreter?",
        "What are data structures?",
        "Explain the difference between an array and a linked list.",
        "What is the difference between a stack and a queue?",
        "What is DBMS?",
        "What is the difference between a primary key and a foreign key?",
        "What is software testing?",
        "What is version control and why is Git used?",
        "What is the difference between a bug and an error?"
    ]

};


// ============================================================
// GENERAL QUESTIONS FOR MIXED INTERVIEWS
// ============================================================

const generalQuestions = [
    "Describe your final year project.",
    "Why did you choose Computer Science?",
    "What are your hobbies?",
    "How do you manage multiple tasks?",
    "What would you do if you didn't know the answer to a question?"
];


// ============================================================
// VARIABLES
// ============================================================

let questions = [];

let currentQuestion = 0;

let timer = null;

let totalSeconds = 300;

let selectedInterviewType = "";

let selectedDifficulty = "";

let selectedMode = "practice";

let selectedRole = "";

let interviewAnswers = [];

let speechRecognition = null;

let isSpeaking = false;

let isInterviewFinished = false;


// ============================================================
// ELEMENTS
// ============================================================

const setupCard = document.getElementById("setupCard");

const timerBox = document.getElementById("timer");

const questionCard = document.getElementById("questionCard");

const loadingScreen = document.getElementById("loadingScreen");

const feedback = document.getElementById("feedback");

const questionNo = document.getElementById("questionNo");

const question = document.getElementById("question");

const answer = document.getElementById("answer");

const voiceStatus = document.getElementById("voiceStatus");

const startBtn = document.getElementById("startBtn");

const writeBtn = document.getElementById("writeBtn");

const speakBtn = document.getElementById("speakBtn");

const nextBtn = document.getElementById("nextBtn");


// ============================================================
// CHECK LOGIN
// ============================================================

function isLoggedIn() {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please log in before starting an AI Mock Interview.");

        window.location.href = "login.html";

        return false;

    }

    return true;

}


// ============================================================
// SHUFFLE QUESTIONS
// ============================================================

function shuffleArray(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];

    }

    return shuffled;

}


// ============================================================
// SELECT QUESTIONS BASED ON INTERVIEW TYPE AND ROLE
// ============================================================

function selectQuestions() {

    const technicalPool =
        roleQuestions[selectedRole] || roleQuestions["Software Developer"];


    if (selectedInterviewType === "HR Interview") {

        questions = shuffleArray(hrQuestions).slice(0, 5);

    }

    else if (selectedInterviewType === "Technical Interview") {

        questions = shuffleArray(technicalPool).slice(0, 5);

    }

    else {

        // Mixed Interview: 2 HR + 3 Technical

        const selectedHR =
            shuffleArray(hrQuestions).slice(0, 2);

        const selectedTechnical =
            shuffleArray(technicalPool).slice(0, 3);

        questions = shuffleArray([
            ...selectedHR,
            ...selectedTechnical
        ]);

    }

}


// ============================================================
// START INTERVIEW
// ============================================================

if (startBtn) {

    startBtn.onclick = function () {

        if (!isLoggedIn()) {
            return;
        }


        // Read selected settings

        const typeElement = document.getElementById("type");

        const roleElement = document.getElementById("role");

        const difficultyElement = document.getElementById("difficulty");

        const modeElement = document.getElementById("interviewMode");


        if (!typeElement || !roleElement ||
            !difficultyElement || !modeElement) {

            alert("Please check your interview settings.");

            return;

        }


        selectedInterviewType = typeElement.value;

        selectedRole = roleElement.value;

        selectedDifficulty = difficultyElement.value;

        selectedMode = modeElement.value;


        // Select questions

        selectQuestions();


        // Reset interview

        currentQuestion = 0;

        interviewAnswers = [];

        isInterviewFinished = false;


        for (let i = 0; i < questions.length; i++) {

            interviewAnswers.push({

                question: questions[i],

                answer: "",

                inputMethod: "written"

            });

        }


        // Hide setup card

        setupCard.style.display = "none";


        // Show timer only in Timed Mode

        if (selectedMode === "timed") {

            timerBox.style.display = "block";

            startTimer();

        }

        else {

            clearInterval(timer);

            timerBox.style.display = "none";

        }


        // Show first question

        questionCard.style.display = "block";

        showQuestion();

    };

}


// ============================================================
// SHOW QUESTION
// ============================================================

function showQuestion() {

    if (!questions[currentQuestion]) {
        return;
    }


    questionNo.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    question.textContent =
        questions[currentQuestion];


    answer.value =
        interviewAnswers[currentQuestion]?.answer || "";


    answer.style.display = "none";

    voiceStatus.style.display = "none";

    voiceStatus.textContent = "";


    isSpeaking = false;


    if (currentQuestion === questions.length - 1) {

        nextBtn.textContent = "Finish Interview";

    }

    else {

        nextBtn.textContent = "Next Question →";

    }

}


// ============================================================
// SAVE CURRENT ANSWER
// ============================================================

function saveCurrentAnswer() {

    if (!questions[currentQuestion]) {
        return;
    }


    let currentAnswer = answer.value.trim();

    let inputMethod = "written";


    const transcriptText =
        voiceStatus.textContent
            .replace("📝 ", "")
            .trim();


    if (
        transcriptText &&
        transcriptText !== "🎤 Listening..." &&
        !transcriptText.startsWith("❌")
    ) {

        currentAnswer = transcriptText;

        inputMethod = "spoken";

    }


    interviewAnswers[currentQuestion] = {

        question: questions[currentQuestion],

        answer: currentAnswer,

        inputMethod: inputMethod

    };

}


// ============================================================
// WRITE ANSWER
// ============================================================

if (writeBtn) {

    writeBtn.onclick = function () {

        stopSpeechRecognition();

        answer.style.display = "block";

        voiceStatus.style.display = "none";

        answer.focus();

    };

}


// ============================================================
// SPEAK ANSWER
// ============================================================

if (speakBtn) {

    speakBtn.onclick = function () {

        answer.style.display = "none";

        voiceStatus.style.display = "block";

        voiceStatus.textContent = "🎤 Listening...";


        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;


        if (!SpeechRecognition) {

            voiceStatus.textContent =
                "❌ Speech Recognition is not supported in this browser.";

            return;

        }


        stopSpeechRecognition();


        speechRecognition = new SpeechRecognition();

        speechRecognition.lang = "en-US";

        speechRecognition.continuous = false;

        speechRecognition.interimResults = false;


        isSpeaking = true;


        speechRecognition.onresult = function (event) {

            const spokenText =
                event.results[0][0].transcript;


            voiceStatus.textContent = "📝 " + spokenText;


            interviewAnswers[currentQuestion] = {

                question: questions[currentQuestion],

                answer: spokenText.trim(),

                inputMethod: "spoken"

            };


            isSpeaking = false;

        };


        speechRecognition.onerror = function (event) {

            console.error("Speech recognition error:", event.error);

            voiceStatus.textContent =
                "❌ Could not recognise speech. Please try again.";

            isSpeaking = false;

        };


        speechRecognition.onend = function () {

            isSpeaking = false;

        };


        try {

            speechRecognition.start();

        }

        catch (error) {

            console.error("Speech recognition could not start:", error);

            voiceStatus.textContent =
                "❌ Microphone could not start. Please try again.";

            isSpeaking = false;

        }

    };

}


// ============================================================
// STOP SPEECH RECOGNITION
// ============================================================

function stopSpeechRecognition() {

    if (speechRecognition) {

        try {

            speechRecognition.stop();

        }

        catch (error) {

            console.log("Speech recognition already stopped.");

        }

        speechRecognition = null;

    }

    isSpeaking = false;

}


// ============================================================
// NEXT QUESTION
// ============================================================

if (nextBtn) {

    nextBtn.onclick = function () {

        if (isInterviewFinished) {
            return;
        }


        if (isSpeaking) {

            stopSpeechRecognition();

        }


        saveCurrentAnswer();


        currentQuestion++;


        if (currentQuestion < questions.length) {

            showQuestion();

        }

        else {

            finishInterview();

        }

    };

}


// ============================================================
// TIMER
// ============================================================

function startTimer() {

    clearInterval(timer);

    totalSeconds = 300;

    updateTimer();


    timer = setInterval(function () {

        totalSeconds--;

        updateTimer();


        if (totalSeconds <= 0) {

            clearInterval(timer);

            alert("Time is up! Your interview will now be evaluated.");

            finishInterview();

        }

    }, 1000);

}


// ============================================================
// UPDATE TIMER
// ============================================================

function updateTimer() {

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    const timeElement = document.getElementById("time");


    if (timeElement) {

        timeElement.textContent =

            String(minutes).padStart(2, "0") +

            ":" +

            String(seconds).padStart(2, "0");

    }

}


// ============================================================
// FINISH INTERVIEW
// ============================================================

function finishInterview() {

    if (isInterviewFinished) {
        return;
    }

    isInterviewFinished = true;

    clearInterval(timer);

    stopSpeechRecognition();


    saveCurrentAnswer();


    timerBox.style.display = "none";

    questionCard.style.display = "none";

    loadingScreen.style.display = "block";


    evaluateInterview();

}


// ============================================================
// EVALUATE INTERVIEW USING BACKEND AI
// ============================================================

async function evaluateInterview() {

    const token = localStorage.getItem("token");


    if (!token) {

        showEvaluationError(
            "Your login session has expired. Please log in again."
        );

        return;

    }


    const answers = interviewAnswers.map(function (item) {

        return {

            question: item.question || "",

            answer: item.answer || "",

            inputMethod: item.inputMethod || "written"

        };

    });


    try {

        const response = await fetch(
            "/api/mock-interview/evaluate",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": `Bearer ${token}`

                },

                body: JSON.stringify({

                    interviewType: selectedInterviewType,

                    jobRole: selectedRole,

                    difficulty: selectedDifficulty,

                    interviewMode: selectedMode,

                    answers: answers

                })

            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "AI evaluation failed."
            );

        }


        loadingScreen.style.display = "none";

        feedback.style.display = "block";


        displayAIReport(data);


        await saveFinalInterviewResult(data);

    }

    catch (error) {

        console.error("AI evaluation error:", error);

        showEvaluationError(
            "Unable to evaluate the interview right now. Please try again."
        );

    }

}


// ============================================================
// DISPLAY AI REPORT
// ============================================================

function displayAIReport(data) {

    const report = document.querySelector(".report-card");


    if (!report) {
        return;
    }


    const overallScore = Number(data.overallScore || 0);

    const communication = data.communication || "Not available";

    const confidence = data.confidence || "Not available";

    const professionalism = data.professionalism || "Not available";

    const clarity = data.clarity || "Not available";

    const recommendation =
        data.recommendation ||
        "Continue practising interview questions and improve your answer structure.";


    let questionFeedbackHTML = "";


    if (Array.isArray(data.questionEvaluations)) {

        questionFeedbackHTML = data.questionEvaluations
            .map(function (item, index) {

                return `

                    <div class="question-feedback">

                        <p><strong>Question ${index + 1}</strong></p>

                        <p>${escapeHTML(item.feedback || "")}</p>

                        <p>
                            <strong>Score:</strong>
                            ${Number(item.score || 0)}/10
                        </p>

                    </div>

                `;

            })
            .join("");

    }


    report.innerHTML = `

        <p>
            <strong>Job Role:</strong>
            ${escapeHTML(selectedRole)}
        </p>

        <p>
            <strong>Interview Type:</strong>
            ${escapeHTML(selectedInterviewType)}
        </p>

        <p>
            <strong>Interview Mode:</strong>
            ${selectedMode === "timed" ? "Timed Mode" : "Practice Mode"}
        </p>

        <p>
            <strong>Questions Attempted:</strong>
            ${answersAttempted()} / ${questions.length}
        </p>

        <p>
            <strong>Overall Score:</strong>
            <span>${overallScore}%</span>
        </p>

        <p>
            <strong>Communication:</strong>
            ${escapeHTML(formatScore(communication))}
        </p>

        <p>
            <strong>Confidence:</strong>
            ${escapeHTML(formatScore(confidence))}
        </p>

        <p>
            <strong>Professionalism:</strong>
            ${escapeHTML(formatScore(professionalism))}
        </p>

        <p>
            <strong>Clarity:</strong>
            ${escapeHTML(formatScore(clarity))}
        </p>

        <p>
            <strong>AI Recommendation:</strong>
            <br>
            ${escapeHTML(recommendation)}
        </p>

        ${
            questionFeedbackHTML
                ? `
                    <hr>
                    <h3>Question-wise Feedback</h3>
                    ${questionFeedbackHTML}
                `
                : ""
        }

    `;

}


// ============================================================
// COUNT ANSWERED QUESTIONS
// ============================================================

function answersAttempted() {

    return interviewAnswers.filter(function (item) {

        return item.answer && item.answer.trim() !== "";

    }).length;

}


// ============================================================
// FORMAT SCORE / FEEDBACK
// ============================================================

function formatScore(value) {

    if (typeof value === "number") {

        return value + "%";

    }

    return String(value);

}


// ============================================================
// SAVE FINAL INTERVIEW RESULT TO MONGODB
// ============================================================

async function saveFinalInterviewResult(data) {

    const token = localStorage.getItem("token");


    if (!token) {
        return;
    }


    try {

        const response = await fetch(
            "/api/mock-interview/result",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": `Bearer ${token}`

                },

                body: JSON.stringify({

                    interviewType: selectedInterviewType,

                    jobRole: selectedRole,

                    difficulty: selectedDifficulty,

                    interviewMode: selectedMode,

                    questionsAttempted: answersAttempted(),

                    score: Number(data.overallScore || 0),

                    communication: data.communication || "",

                    confidence: data.confidence || "",

                    professionalism: data.professionalism || "",

                    clarity: data.clarity || "",

                    recommendation: data.recommendation || ""

                })

            }
        );


        const result = await response.json();


        if (response.ok) {

            console.log("Interview result saved to MongoDB:", result);

        }

        else {

            console.error("MongoDB save failed:", result.message);

        }

    }

    catch (error) {

        console.error("Could not save interview result:", error);

    }

}


// ============================================================
// SHOW EVALUATION ERROR
// ============================================================

function showEvaluationError(message) {

    loadingScreen.style.display = "none";

    feedback.style.display = "block";


    const report = document.querySelector(".report-card");


    if (report) {

        report.innerHTML = `

            <p>❌ ${escapeHTML(message)}</p>

            <p>
                Your answers were not scored.
                Please restart the interview and try again.
            </p>

        `;

    }

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
