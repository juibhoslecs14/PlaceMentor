
const API_URL = "http://localhost:5000/api/mock-interview/history";

const token = localStorage.getItem("token");

const historyList = document.getElementById("interviewHistoryList");


// ==========================================
// LOAD INTERVIEW HISTORY
// ==========================================

async function loadInterviewHistory() {

    if (!token) {
        historyList.innerHTML = `
            <p class="history-loading">
                Please log in to view your interview history.
            </p>
        `;
        return;
    }

    try {

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.status === 401 || response.status === 403) {
            historyList.innerHTML = `
                <p class="history-loading">
                    Your session has expired. Please log in again.
                </p>
            `;
            return;
        }

        if (!response.ok) {
            throw new Error(data.message || "Unable to load interview history.");
        }

        // Extract interview records from the API response
        const interviews = Array.isArray(data)
            ? data
            : data.interviews ||
              data.history ||
              data.data?.interviews ||
              [];

        // Newest interviews first
        interviews.sort((a, b) =>
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );

        displayStatistics(interviews);
        displayInterviewHistory(interviews);

    } catch (error) {

        console.error("Interview History Error:", error);

        historyList.innerHTML = `
            <p class="history-loading">
                Unable to connect to the server.
                Please check whether your backend is running.
            </p>
        `;
    }
}


// ==========================================
// DISPLAY STATISTICS
// ==========================================

function displayStatistics(interviews) {

    const scores = interviews.map(interview =>
        Number(interview.score ?? interview.overallScore ?? 0)
    );

    const total = interviews.length;

    const average = total
        ? Math.round(
            scores.reduce((sum, score) => sum + score, 0) / total
        )
        : 0;

    const best = total ? Math.max(...scores) : 0;

    document.getElementById("totalInterviews").textContent = total;

    document.getElementById("averageScore").textContent =
        average + "%";

    document.getElementById("bestScore").textContent =
        best + "%";
}


// ==========================================
// DISPLAY INTERVIEW RECORDS
// ==========================================

function displayInterviewHistory(interviews) {

    if (!interviews.length) {

        historyList.innerHTML = `
            <div class="empty-history">

                <i class="fa-solid fa-folder-open"></i>

                <h3>No Interviews Yet</h3>

                <p>
                    Your completed AI mock interviews will appear here.
                    Start your first interview and track your progress!
                </p>

                <a href="aimock.html">
                    Start Your First Interview
                </a>

            </div>
        `;

        return;
    }

    historyList.innerHTML = interviews.map(interview => {

        const role = interview.jobRole || "Software Developer";

        const type = interview.interviewType || "Mixed Interview";

        const difficulty = interview.difficulty || "Medium";

        const mode = interview.interviewMode || "practice";

        const score = Number(
            interview.score ?? interview.overallScore ?? 0
        );

        const recommendation =
            interview.recommendation || "No recommendation available.";

        const date = interview.createdAt
            ? new Date(interview.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
            })
            : "Date unavailable";

        return `
            <div class="interview-history-card">

                <div class="history-card-top">

                    <div class="history-role">

                        <div class="role-icon">
                            <i class="fa-solid fa-laptop-code"></i>
                        </div>

                        <div>
                            <h3>${escapeHTML(role)}</h3>
                            <p>${escapeHTML(date)}</p>
                        </div>

                    </div>

                    <div class="history-score">
                        <span>${escapeHTML(String(score))}%</span>
                        <small>Overall Score</small>
                    </div>

                </div>

                <div class="history-details">

                    <span>
                        <i class="fa-solid fa-user-tie"></i>
                        ${escapeHTML(type)}
                    </span>

                    <span>
                        <i class="fa-solid fa-signal"></i>
                        ${escapeHTML(difficulty)}
                    </span>

                    <span>
                        <i class="fa-solid fa-clock"></i>
                        ${mode === "timed" ? "Timed Mode" : "Practice Mode"}
                    </span>

                </div>

                <div class="history-recommendation">

                    <strong>AI Recommendation:</strong>

                    <p>${escapeHTML(recommendation)}</p>

                </div>

            </div>
        `;

    }).join("");
}


// ==========================================
// SECURITY: ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];

    });
}


// ==========================================
// INITIALIZE PAGE
// ==========================================

loadInterviewHistory();
    