
/* =========================================================
   PLACEMENTOR — DASHBOARD
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");
    let currentUserId = null;

    /* =====================================================
       HELPER: SAFELY READ LOCAL STORAGE
       ===================================================== */

    function getStoredData(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (error) {
            console.error(`Unable to read ${key}:`, error);
            return fallback;
        }
    }


    /* =====================================================
       HELPER: UPDATE STATISTICS
       ===================================================== */

    const statBoxes = document.querySelectorAll(".stat-box");

    function updateStat(index, value) {

        if (!statBoxes[index]) return;

        const heading = statBoxes[index].querySelector("h2");

        if (heading) {
            heading.textContent = value;
        }
    }


    /* =====================================================
       USER INFORMATION
       ===================================================== */

    
/* =====================================================
   USER INFORMATION
   ===================================================== */

const welcomeMessage =
    document.getElementById("welcomeMessage");

if (!token) {
    window.location.href = "login.html";
    return;
}

try {
    const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to load user profile.");
        currentUserId = data.user._id;
    }

    if (welcomeMessage) {
        welcomeMessage.textContent =
            `👋 Welcome Back, ${data.user.name || "Student"}!`;
    }

} catch (error) {
    console.error("Dashboard user error:", error);

    if (welcomeMessage) {
        welcomeMessage.textContent = "👋 Welcome to PlaceMentor!";
    }
}

    /* =====================================================
       QUIZ HISTORY AND STATISTICS
       ===================================================== */

    const quizHistoryList =
        document.getElementById("quizHistoryList");

    if (token) {

        try {

            const response = await fetch("/api/quiz/history", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load quiz history"
                );
            }

            const results = Array.isArray(data.results)
                ? data.results
                : [];

            // Total quiz attempts
            const quizCount = results.length;

            // Calculate average accuracy
            let overallAccuracy = 0;

            if (quizCount > 0) {

                const totalPercentage = results.reduce(
                    (total, result) =>
                        total + Number(result.percentage || 0),
                    0
                );

                overallAccuracy = Math.round(
                    totalPercentage / quizCount
                );

            }

            // Update dashboard statistics
            updateStat(0, quizCount);
            updateStat(2, overallAccuracy + "%");


            /* =============================================
               DISPLAY QUIZ HISTORY
               ============================================= */

            if (quizHistoryList) {

                quizHistoryList.innerHTML = "";

                if (results.length === 0) {

                    const message = document.createElement("p");

                    message.className = "no-quiz-history";

                    message.textContent =
                        "No quiz attempts yet. Start practising to see your results here!";

                    quizHistoryList.appendChild(message);

                } else {

                    results.forEach((result, index) => {

                        const attempt =
                            document.createElement("div");

                        attempt.className = "quiz-history-item";

                        const info =
                            document.createElement("div");

                        info.className = "quiz-attempt-info";

                        const title =
                            document.createElement("h3");

                        title.textContent =
                            `Quiz Attempt ${results.length - index}`;

                        const dateElement =
                            document.createElement("p");

                        const date = new Date(result.createdAt);

                        dateElement.textContent =
                            isNaN(date.getTime())
                                ? "Date unavailable"
                                : date.toLocaleString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                });

                        info.appendChild(title);
                        info.appendChild(dateElement);


                        const scoreContainer =
                            document.createElement("div");

                        scoreContainer.className =
                            "quiz-attempt-score";

                        const scoreHeading =
                            document.createElement("h3");

                        scoreHeading.textContent =
                            `${Number(result.score) || 0}/${Number(result.totalQuestions) || 0}`;

                        const percentageElement =
                            document.createElement("p");

                        percentageElement.textContent =
                            `${Number(result.percentage) || 0}%`;

                        scoreContainer.appendChild(scoreHeading);
                        scoreContainer.appendChild(percentageElement);

                        attempt.appendChild(info);
                        attempt.appendChild(scoreContainer);

                        quizHistoryList.appendChild(attempt);

                    });

                }

            }

        } catch (error) {

            console.error("Quiz statistics error:", error);

            if (quizHistoryList) {
                quizHistoryList.textContent =
                    "Unable to load quiz history.";
            }

        }

    } else {

        if (quizHistoryList) {
            quizHistoryList.textContent =
                "Please log in to view your quiz history.";
        }

    }


    /* =====================================================
       MOCK INTERVIEW STATISTICS
       ===================================================== */

    if (token) {

        try {

            const response = await fetch(
                "/api/mock-interview/history",
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load interview history"
                );
            }

            const interviews = Array.isArray(data.interviews)
                ? data.interviews
                : [];

            updateStat(1, interviews.length);

        } catch (error) {

            console.error(
                "Mock interview statistics error:",
                error
            );

        }

    }


    /* =====================================================
       COURSE COMPLETION STATISTICS
       ===================================================== */

    if (token) {

        try {

            const response = await fetch(
                "/api/courses/progress",
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load course progress"
                );
            }

            const progress = Array.isArray(data.progress)
                ? data.progress
                : [];

            const completedCourses = progress.filter(
                course => course.completed === true
            );

            const completedCoursesElement =
                document.getElementById("completedCourses");

            if (completedCoursesElement) {

                completedCoursesElement.textContent =
                    completedCourses.length;

            }

        } catch (error) {

            console.error(
                "Course statistics error:",
                error
            );

        }

    }


    /* =====================================================
       TODAY'S GOALS
       ===================================================== */

    const defaultGoals = [
        {
            text: "Complete AI Mock Interview",
            completed: false
        },
        {
            text: "Complete Quiz",
            completed: false
        },
        {
            text: "Complete One Recommended Course",
            completed: false
        }
    ];

   const goalsStorageKey = `placeMentorGoals_${currentUserId}`;

        let goals = getStoredData(
          goalsStorageKey,
            defaultGoals
);

    if (!Array.isArray(goals)) {
        goals = defaultGoals;
    }

    const goalList =
        document.getElementById("goalList");

    const progressFill =
        document.getElementById("progressFill");

    const progressText =
        document.getElementById("progressText");

    const editGoalsBtn =
        document.getElementById("editGoalsBtn");

    const addGoalBtn =
        document.getElementById("addGoalBtn");

    let editingGoals = false;


    /* =====================================================
       SAVE GOALS
       ===================================================== */

    function saveGoals() {

       localStorage.setItem(
    goalsStorageKey,
    JSON.stringify(goals)
);

    }


    /* =====================================================
       UPDATE GOAL PROGRESS
       ===================================================== */

    function updateProgress() {

        if (goals.length === 0) {

            if (progressFill) {
                progressFill.style.width = "0%";
            }

            if (progressText) {
                progressText.textContent =
                    "0% Completed Today";
            }

            return;
        }

        const completedGoals =
            goals.filter(goal => goal.completed).length;

        const progress =
            Math.round(
                (completedGoals / goals.length) * 100
            );

        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

        if (progressText) {
            progressText.textContent =
                `${progress}% Completed Today`;
        }

    }


    /* =====================================================
       RENDER GOALS
       ===================================================== */

    function renderGoals() {

        if (!goalList) return;

        goalList.innerHTML = "";

        goals.forEach((goal, index) => {

            const goalItem =
                document.createElement("div");

            goalItem.className = "goal-item";

            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.checked = Boolean(goal.completed);
            checkbox.className = "goal-checkbox";

            checkbox.addEventListener("change", () => {

                goals[index].completed = checkbox.checked;

                saveGoals();
                renderGoals();

            });


            const text =
                document.createElement("span");

            text.className = "goal-text";
            text.textContent = goal.text;

            if (goal.completed) {
                text.classList.add("completed");
            }


            if (editingGoals) {

                const input =
                    document.createElement("input");

                input.type = "text";
                input.value = goal.text;
                input.className = "goal-edit-input";

                input.addEventListener("change", () => {

                    const newText = input.value.trim();

                    if (newText) {

                        goals[index].text = newText;

                        saveGoals();
                        renderGoals();

                    }

                });

                goalItem.appendChild(checkbox);
                goalItem.appendChild(input);


                const deleteButton =
                    document.createElement("button");

                deleteButton.type = "button";
                deleteButton.textContent = "🗑️";
                deleteButton.className = "delete-goal-btn";

                deleteButton.addEventListener("click", () => {

                    goals.splice(index, 1);

                    saveGoals();
                    renderGoals();

                });

                goalItem.appendChild(deleteButton);

            } else {

                goalItem.appendChild(checkbox);
                goalItem.appendChild(text);

            }

            goalList.appendChild(goalItem);

        });

        updateProgress();

    }


    /* =====================================================
       EDIT GOALS
       ===================================================== */

    if (editGoalsBtn) {

        editGoalsBtn.addEventListener("click", () => {

            editingGoals = !editingGoals;

            editGoalsBtn.textContent =
                editingGoals ? "✅ Done" : "✏️ Edit";

            if (!editingGoals) {
                saveGoals();
            }

            renderGoals();

        });

    }


    /* =====================================================
       ADD NEW GOAL
       ===================================================== */

    if (addGoalBtn) {

        addGoalBtn.addEventListener("click", () => {

            const newGoal = prompt("Enter your new goal:");

            if (!newGoal) return;

            const cleanGoal = newGoal.trim();

            if (!cleanGoal) return;

            goals.push({
                text: cleanGoal,
                completed: false
            });

            saveGoals();

            editingGoals = true;

            if (editGoalsBtn) {
                editGoalsBtn.textContent = "✅ Done";
            }

            renderGoals();

        });

    }


    /* =====================================================
       INITIALIZE GOALS
       ===================================================== */

    renderGoals();


    /* =====================================================
       DASHBOARD LOADED
       ===================================================== */

/* =====================================================
   DASHBOARD LOADED
   ===================================================== */

console.log(
    "PlaceMentor Dashboard loaded successfully."
);

});
