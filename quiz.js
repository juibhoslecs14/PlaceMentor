
// ==========================================
// PLACEMENTOR - QUESTION BANK
// ==========================================

const questionBank = [

    // -------- TECHNICAL KNOWLEDGE --------

    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "Python", "CSS", "Java"],
        answer: "CSS"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which protocol is secure?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        answer: "HTTPS"
    },
    {
        question: "Which SQL command retrieves data?",
        options: ["SELECT", "DELETE", "INSERT", "UPDATE"],
        answer: "SELECT"
    },
    {
        question: "What does DBMS stand for?",
        options: [
            "Database Management System",
            "Data Backup Management System",
            "Digital Base Management",
            "Data Machine System"
        ],
        answer: "Database Management System"
    },
    {
        question: "Which tag creates a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        question: "Which company originally developed Java?",
        options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
        answer: "Sun Microsystems"
    },
    {
        question: "Which device connects different networks?",
        options: ["Router", "Keyboard", "Monitor", "Printer"],
        answer: "Router"
    },
    {
        question: "Which language is commonly interpreted?",
        options: ["Python", "C", "C++", "Assembly"],
        answer: "Python"
    },
    {
        question: "What is the full form of CPU?",
        options: [
            "Central Processing Unit",
            "Computer Processing Unit",
            "Central Program Unit",
            "Computer Program Unit"
        ],
        answer: "Central Processing Unit"
    },

    // -------- PROGRAMMING --------

    {
        question: "Which symbol is used for comments in JavaScript for a single line?",
        options: ["//", "<!-- -->", "**", "##"],
        answer: "//"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["var", "define", "integer", "variable"],
        answer: "var"
    },
    {
        question: "Which data type stores True or False values?",
        options: ["String", "Boolean", "Integer", "Float"],
        answer: "Boolean"
    },
    {
        question: "Which loop executes at least once before checking its condition?",
        options: ["for", "while", "do-while", "foreach"],
        answer: "do-while"
    },
    {
        question: "Which operator is used for equality comparison in JavaScript?",
        options: ["=", "===", "+=", "!="],
        answer: "==="
    },
    {
        question: "Which language is mainly used for Android app development?",
        options: ["Kotlin", "HTML", "CSS", "SQL"],
        answer: "Kotlin"
    },
    {
        question: "What is the output of 5 + 3 in JavaScript?",
        options: ["53", "8", "2", "15"],
        answer: "8"
    },
    {
        question: "Which data structure follows LIFO?",
        options: ["Queue", "Stack", "Array", "Tree"],
        answer: "Stack"
    },
    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Tree", "Queue", "Graph"],
        answer: "Queue"
    },
    {
        question: "Which keyword is used to define a function in JavaScript?",
        options: ["function", "method", "define", "fun"],
        answer: "function"
    },

    // -------- DATABASE AND WEB DEVELOPMENT --------

    {
        question: "Which SQL command is used to delete a table?",
        options: ["REMOVE", "DROP", "CLEAR", "ERASE"],
        answer: "DROP"
    },
    {
        question: "Which HTML tag inserts an image?",
        options: ["<image>", "<img>", "<pic>", "<src>"],
        answer: "<img>"
    },
    {
        question: "Which CSS property changes text colour?",
        options: ["background", "font-style", "color", "text-size"],
        answer: "color"
    },
    {
        question: "Which database is used by PlaceMentor?",
        options: ["MongoDB", "MS Paint", "Notepad", "PowerPoint"],
        answer: "MongoDB"
    },
    {
        question: "What is the purpose of a primary key?",
        options: [
            "To uniquely identify a record",
            "To format a webpage",
            "To delete a database",
            "To connect a keyboard"
        ],
        answer: "To uniquely identify a record"
    },
    {
        question: "Which HTTP method is commonly used to send new data to a server?",
        options: ["GET", "POST", "READ", "FETCH"],
        answer: "POST"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Computer Style System",
            "Creative Styling Software",
            "Coded Sheet Structure"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which JavaScript method selects an element by its ID?",
        options: [
            "getElementById()",
            "getClass()",
            "selectElement()",
            "findId()"
        ],
        answer: "getElementById()"
    },
    {
        question: "What does API stand for?",
        options: [
            "Application Programming Interface",
            "Advanced Program Internet",
            "Application Process Integration",
            "Automated Programming Input"
        ],
        answer: "Application Programming Interface"
    },
    {
        question: "Which file extension is used for JavaScript files?",
        options: [".html", ".css", ".js", ".java"],
        answer: ".js"
    },

    // -------- APTITUDE AND LOGICAL REASONING --------

    {
        question: "What is 15% of 200?",
        options: ["20", "25", "30", "35"],
        answer: "30"
    },
    {
        question: "Find the next number: 2, 4, 8, 16, ?",
        options: ["20", "24", "32", "36"],
        answer: "32"
    },
    {
        question: "If 5 pens cost ₹50, what is the cost of 1 pen?",
        options: ["₹5", "₹10", "₹15", "₹20"],
        answer: "₹10"
    },
    {
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "14"],
        answer: "12"
    },
    {
        question: "Find the odd one out.",
        options: ["Apple", "Mango", "Carrot", "Banana"],
        answer: "Carrot"
    },
    {
        question: "A person travels 60 km in 2 hours. What is the average speed?",
        options: ["20 km/h", "30 km/h", "40 km/h", "60 km/h"],
        answer: "30 km/h"
    },
    {
        question: "What is the next number: 5, 10, 15, 20, ?",
        options: ["22", "24", "25", "30"],
        answer: "25"
    },
    {
        question: "If today is Monday, what day will it be after 10 days?",
        options: ["Wednesday", "Thursday", "Friday", "Saturday"],
        answer: "Thursday"
    },
    {
        question: "What is 12 multiplied by 8?",
        options: ["86", "92", "96", "108"],
        answer: "96"
    },
    {
        question: "Which number is the smallest?",
        options: ["0.5", "0.05", "0.55", "0.15"],
        answer: "0.05"
    },

    // -------- HR AND INTERVIEW --------

    {
        question: "The best greeting in an interview is:",
        options: [
            "Hey Bro",
            "Yo",
            "Good Morning Sir/Ma'am",
            "Hi Dude"
        ],
        answer: "Good Morning Sir/Ma'am"
    },
    {
        question: "What should you do if you don't know an interview answer?",
        options: [
            "Stay silent",
            "Guess randomly",
            "Admit honestly and explain your approach",
            "Leave"
        ],
        answer: "Admit honestly and explain your approach"
    },
    {
        question: "What is a good way to answer 'Tell me about yourself'?",
        options: [
            "Talk only about hobbies",
            "Briefly explain education, skills and goals",
            "Discuss personal problems",
            "Give no answer"
        ],
        answer: "Briefly explain education, skills and goals"
    },
    {
        question: "What should you do before attending an interview?",
        options: [
            "Research the company",
            "Ignore the job description",
            "Avoid preparation",
            "Arrive without knowing anything"
        ],
        answer: "Research the company"
    },
    {
        question: "Which quality is important for teamwork?",
        options: [
            "Poor communication",
            "Cooperation",
            "Ignoring others",
            "Avoiding responsibility"
        ],
        answer: "Cooperation"
    },
    {
        question: "How should you respond to constructive feedback?",
        options: [
            "Ignore it",
            "Argue immediately",
            "Listen and improve",
            "Blame others"
        ],
        answer: "Listen and improve"
    },
    {
        question: "What does punctuality mean?",
        options: [
            "Being late",
            "Being on time",
            "Leaving early without permission",
            "Skipping meetings"
        ],
        answer: "Being on time"
    },

    // -------- RESUME AND CAREER --------

    {
        question: "For a fresher, an ideal resume is generally:",
        options: ["1 Page", "5 Pages", "10 Pages", "Unlimited"],
        answer: "1 Page"
    },
    {
        question: "Which section highlights your technical abilities?",
        options: [
            "Skills",
            "Declaration",
            "Address",
            "References"
        ],
        answer: "Skills"
    },
    {
        question: "Which of these is useful to include in a fresher's resume?",
        options: [
            "Academic projects",
            "Unrelated personal arguments",
            "False work experience",
            "Unverified achievements"
        ],
        answer: "Academic projects"
    },
    {
        question: "What should you do before submitting your resume?",
        options: [
            "Check spelling and formatting",
            "Add incorrect details",
            "Leave empty sections",
            "Use random fonts everywhere"
        ],
        answer: "Check spelling and formatting"
    },
    {
        question: "Which platform is commonly used for professional networking?",
        options: ["LinkedIn", "Instagram", "Snapchat", "Pinterest"],
        answer: "LinkedIn"
    },
    {
        question: "What is the purpose of a cover letter?",
        options: [
            "To introduce yourself and explain your interest in a role",
            "To replace all educational qualifications",
            "To list unrelated hobbies only",
            "To provide computer passwords"
        ],
        answer: "To introduce yourself and explain your interest in a role"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];

const welcomeCard = document.getElementById("welcomeCard");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");

const questionNo = document.getElementById("questionNo");
const question = document.getElementById("question");

const optionButtons = document.querySelectorAll(".option");

const QUESTIONS_PER_QUIZ = 10;

const HISTORY_KEY = "placeMentorQuizQuestionHistory";


// ==========================================
// SHUFFLE FUNCTION
// ==========================================

function shuffleArray(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];

    }

    return shuffled;
}


// ==========================================
// GET QUESTIONS WITHOUT RECENT REPEATS
// ==========================================

function getRandomQuestions() {

    let usedQuestions = [];

    try {

        usedQuestions =
            JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

    } catch (error) {

        usedQuestions = [];

    }

    // Find questions that have not appeared before
    let availableQuestions = questionBank.filter(item =>
        !usedQuestions.includes(item.question)
    );

    // Reset history only after every question has been used
    if (availableQuestions.length === 0) {

        usedQuestions = [];
        availableQuestions = [...questionBank];

    }

    // First select questions that have never appeared
    let selectedQuestions = shuffleArray(availableQuestions)
        .slice(0, QUESTIONS_PER_QUIZ);

    // If fewer than 10 unseen questions remain,
    // fill the remaining places with other questions
    if (selectedQuestions.length < QUESTIONS_PER_QUIZ) {

        const selectedTexts = selectedQuestions.map(item =>
            item.question
        );

        const remainingQuestions = questionBank.filter(item =>
            !selectedTexts.includes(item.question)
        );

        const extraQuestions = shuffleArray(remainingQuestions)
            .slice(0, QUESTIONS_PER_QUIZ - selectedQuestions.length);

        selectedQuestions.push(...extraQuestions);

    }

    // Save all questions shown in this attempt
    const updatedHistory = [
        ...new Set([
            ...usedQuestions,
            ...selectedQuestions.map(item => item.question)
        ])
    ];

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(updatedHistory)
    );

    // Shuffle the answer options separately
    return selectedQuestions.map(item => ({
        ...item,
        options: shuffleArray(item.options)
    }));

}


// ==========================================
// START QUIZ
// ==========================================

document.getElementById("startQuiz").onclick = function () {

    welcomeCard.style.display = "none";
    quizCard.style.display = "block";
    resultCard.style.display = "none";

    questions = getRandomQuestions();

    currentQuestion = 0;
    score = 0;
    selectedAnswers = [];

    const oldReview = document.getElementById("answerReview");

    if (oldReview) {
        oldReview.remove();
    }

    showQuestion();

};


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    questionNo.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    question.textContent =
        questions[currentQuestion].question;

    optionButtons.forEach((button, index) => {

        button.textContent =
            questions[currentQuestion].options[index];

        button.disabled = false;

        button.onclick = function () {

            checkAnswer(button.textContent);

        };

    });

}


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer(selected) {

    const correctAnswer =
        questions[currentQuestion].answer;

    const isCorrect =
        selected === correctAnswer;

    if (isCorrect) {
        score++;
    }

    selectedAnswers.push({

        question: questions[currentQuestion].question,

        selectedAnswer: selected,

        correctAnswer: correctAnswer,

        isCorrect: isCorrect

    });

    optionButtons.forEach(button => {
        button.disabled = true;
    });

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

}


// ==========================================
// SHOW RESULT
// ==========================================

function showResult() {

    quizCard.style.display = "none";
    resultCard.style.display = "block";

    document.getElementById("score").textContent =
        score + " / " + questions.length;

    const message = document.getElementById("message");

    if (score >= 9) {

        message.textContent =
            "🏆 Outstanding! You're placement ready!";

    } else if (score >= 7) {

        message.textContent =
            "🎉 Great Job! Keep practising!";

    } else if (score >= 5) {

        message.textContent =
            "👍 Good! A little more practice will make you perfect.";

    } else {

        message.textContent =
            "💪 Don't worry! Practice makes perfect.";

    }

    displayAnswerReview();

    saveQuizResult();

}


// ==========================================
// ANSWER REVIEW
// ==========================================

function displayAnswerReview() {

    const oldReview =
        document.getElementById("answerReview");

    if (oldReview) {
        oldReview.remove();
    }

    const reviewContainer =
        document.createElement("div");

    reviewContainer.id = "answerReview";
    reviewContainer.className = "answer-review";

    const heading =
        document.createElement("h2");

    heading.textContent = "📝 Answer Review";

    reviewContainer.appendChild(heading);

    selectedAnswers.forEach((item, index) => {

        const answerCard =
            document.createElement("div");

        answerCard.className =
            item.isCorrect
                ? "review-item correct-answer"
                : "review-item wrong-answer";

        const questionTitle =
            document.createElement("h3");

        questionTitle.textContent =
            `Question ${index + 1}: ${item.question}`;

        const yourAnswer =
            document.createElement("p");

        yourAnswer.textContent =
            "Your Answer: " + item.selectedAnswer;

        const status =
            document.createElement("p");

        status.className = "answer-status";

        if (item.isCorrect) {

            status.textContent = "✓ Correct Answer";

        } else {

            status.textContent = "✗ Incorrect Answer";

        }

        answerCard.appendChild(questionTitle);
        answerCard.appendChild(yourAnswer);
        answerCard.appendChild(status);

        if (!item.isCorrect) {

            const correct =
                document.createElement("p");

            correct.className = "correct-answer-text";

            correct.textContent =
                "Correct Answer: " + item.correctAnswer;

            answerCard.appendChild(correct);

        }

        reviewContainer.appendChild(answerCard);

    });

    resultCard.appendChild(reviewContainer);

}


// ==========================================
// SAVE QUIZ RESULT TO MONGODB
// ==========================================

async function saveQuizResult() {

    const token =
        localStorage.getItem("token");

    if (!token) {

        console.error("No login token found.");
        return;

    }

    try {

        const response = await fetch(
            "/api/quiz/result",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({

                    score: score,

                    totalQuestions: questions.length

                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            console.log(
                "Quiz result saved successfully:",
                data
            );

        } else {

            console.error(
                "Quiz result could not be saved:",
                data.message
            );

        }

    } catch (error) {

        console.error(
            "Error saving quiz result:",
            error
        );

    }

}
