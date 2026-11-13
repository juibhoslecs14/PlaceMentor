/* =========================================================
   PLACEMENTOR — RESUME BUILDER
   ========================================================= */


/* =========================================================
   GET ELEMENTS
   ========================================================= */

const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const printBtn = document.getElementById("printBtn");
const newResumeBtn = document.getElementById("newResumeBtn");

const resumePreview = document.getElementById("resumePreview");
const previewActions = document.getElementById("previewActions");

const summaryBtn = document.getElementById("summaryBtn");

const profilePhotoInput = document.getElementById("profilePhoto");
const profilePhotoPreview = document.getElementById("profilePhotoPreview");
const photoPlaceholder = document.getElementById("photoPlaceholder");

let profilePhotoData = "";
let selectedTemplate = localStorage.getItem("placeMentorResumeTemplate") || "classic";

if (!["classic", "modern", "minimal"].includes(selectedTemplate)) {
    selectedTemplate = "classic";
}

function updatePhotoPreview() {
    if (profilePhotoPreview) {
        if (profilePhotoData) {
            profilePhotoPreview.src = profilePhotoData;
            profilePhotoPreview.style.display = "block";
        } else {
            profilePhotoPreview.removeAttribute("src");
            profilePhotoPreview.style.display = "none";
        }
    }

    if (photoPlaceholder) {
        photoPlaceholder.style.display = profilePhotoData ? "none" : "block";
    }
}

function updateTemplateSelection() {
    document.querySelectorAll(".template-card").forEach(function (card) {
        const isSelected = card.dataset.template === selectedTemplate;
        card.classList.toggle("active", isSelected);
        card.setAttribute("aria-pressed", String(isSelected));
    });
}

function resetResumeExtras() {
    profilePhotoData = "";
    selectedTemplate = "classic";
    localStorage.removeItem("placeMentorResumeTemplate");
    updatePhotoPreview();
    updateTemplateSelection();
}

function restoreResumeExtras() {
    try {
        const saved = JSON.parse(localStorage.getItem("placeMentorResume") || "{}");

        profilePhotoData = saved.profilePhoto || "";

        selectedTemplate = saved.resumeTemplate ||
            localStorage.getItem("placeMentorResumeTemplate") ||
            "classic";

        if (!["classic", "modern", "minimal"].includes(selectedTemplate)) {
            selectedTemplate = "classic";
        }

        updatePhotoPreview();
        updateTemplateSelection();

    } catch (error) {
        console.warn("Could not restore resume photo/template:", error);
    }
}

function resizePhoto(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const image = new Image();

            image.onload = function () {
                const maxDimension = 500;

                const scale = Math.min(
                    1,
                    maxDimension / Math.max(image.width, image.height)
                );

                const canvas = document.createElement("canvas");

                canvas.width = Math.round(image.width * scale);
                canvas.height = Math.round(image.height * scale);

                const context = canvas.getContext("2d");

                context.drawImage(
                    image,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                resolve(canvas.toDataURL("image/jpeg", 0.82));
            };

            image.onerror = reject;
            image.src = event.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


/* =========================================================
   PROFILE PHOTO UPLOAD
   ========================================================= */

if (profilePhotoInput) {
    profilePhotoInput.addEventListener("change", async function () {

        const file = profilePhotoInput.files &&
            profilePhotoInput.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please choose an image file.");
            profilePhotoInput.value = "";
            return;
        }

        try {
            profilePhotoData = await resizePhoto(file);

            updatePhotoPreview();
            saveResumeData();

            if (getValue("fullName") && getValue("email")) {
                generateResume();
            }

        } catch (error) {
            console.error("Could not load profile photo:", error);

            alert(
                "Sorry, this photo could not be loaded. Please try another image."
            );
        }
    });
}


/* =========================================================
   TEMPLATE SELECTION
   ========================================================= */

document.querySelectorAll(".template-card").forEach(function (card) {

    card.addEventListener("click", function () {

        const template = card.dataset.template;

        if (!["classic", "modern", "minimal"].includes(template)) {
            return;
        }

        selectedTemplate = template;

        localStorage.setItem(
            "placeMentorResumeTemplate",
            selectedTemplate
        );

        updateTemplateSelection();

        if (getValue("fullName") && getValue("email")) {
            generateResume();
        } else {
            saveResumeData();
        }
    });

});


/* =========================================================
   HELPER FUNCTION
   ========================================================= */

function getValue(id) {

    const element = document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   GET SKILLS
   ========================================================= */

function getSkills() {

    const technicalSkills = getValue("technicalSkills");
    const tools = getValue("tools");
    const softSkills = getValue("softSkills");

    const allSkills = [
        technicalSkills,
        tools,
        softSkills
    ].join(",");

    if (!allSkills.trim()) {
        return [];
    }

    return allSkills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");
}


/* =========================================================
   GET EDUCATION
   ========================================================= */

function getEducation() {

    const degree = getValue("degree");
    const college = getValue("college");
    const year = getValue("graduationYear");
    const cgpa = getValue("cgpa");

    if (!degree && !college && !year && !cgpa) {
        return [];
    }

    return [
        {
            degree,
            college,
            year,
            cgpa
        }
    ];
}


/* =========================================================
   GET PROJECT
   ========================================================= */

function getProjects() {

    const title = getValue("projectTitle");
    const technology = getValue("projectTech");
    const description = getValue("projectDescription");
    const link = getValue("projectLink");

    if (!title && !technology && !description && !link) {
        return [];
    }

    return [
        {
            name: title,
            technology,
            description,
            link
        }
    ];
}


/* =========================================================
   GET CERTIFICATION
   ========================================================= */

function getCertifications() {

    const name = getValue("certification");
    const organization = getValue("certOrganization");
    const year = getValue("certYear");

    if (!name && !organization && !year) {
        return [];
    }

    return [
        {
            name,
            organization,
            year
        }
    ];
}


/* =========================================================
   GET EXPERIENCE
   ========================================================= */

function getExperience() {

    const company = getValue("company");
    const role = getValue("role");
    const duration = getValue("experienceDuration");
    const description = getValue("experienceDescription");

    if (!company && !role && !duration && !description) {
        return [];
    }

    return [
        {
            company,
            role,
            duration,
            description
        }
    ];
}


/* =========================================================
   GET ACHIEVEMENTS
   ========================================================= */

function getAchievements() {

    const achievements = getValue("achievements");

    if (!achievements) {
        return [];
    }

    return achievements
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");
}


/* =========================================================
   COLLECT COMPLETE RESUME DATA
   ========================================================= */

function collectResumeData() {

    return {

        fullName: getValue("fullName"),
        email: getValue("email"),
        phone: getValue("phone"),
        location: getValue("location"),
        linkedin: getValue("linkedin"),
        github: getValue("github"),

        summary: getValue("summary"),
        preferredRole: getValue("preferredRole"),
        careerInterests: getValue("careerInterests"),

        degree: getValue("degree"),
        college: getValue("college"),
        graduationYear: getValue("graduationYear"),
        cgpa: getValue("cgpa"),

        technicalSkills: getValue("technicalSkills"),
        tools: getValue("tools"),
        softSkills: getValue("softSkills"),

        projectTitle: getValue("projectTitle"),
        projectTech: getValue("projectTech"),
        projectDescription: getValue("projectDescription"),
        projectLink: getValue("projectLink"),

        certification: getValue("certification"),
        certOrganization: getValue("certOrganization"),
        certYear: getValue("certYear"),

        company: getValue("company"),
        role: getValue("role"),
        experienceDuration: getValue("experienceDuration"),
        experienceDescription: getValue("experienceDescription"),

        achievements: getValue("achievements"),

        profilePhoto: profilePhotoData,
        resumeTemplate: selectedTemplate
    };
}


/* =========================================================
   SUGGEST SUMMARY
   ========================================================= */


/* =========================================================
   AI POWERED SUGGEST SUMMARY
   ========================================================= */

if (summaryBtn) {

    summaryBtn.addEventListener("click", async function () {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please log in to use AI Summary Generator.");
            return;
        }

        const originalText = summaryBtn.innerHTML;

        summaryBtn.disabled = true;
        summaryBtn.innerHTML = "✨ Generating your summary...";

        try {

            const resumeData = collectResumeData();

            resumeData.preferredRole =
                getValue("preferredRole");

            resumeData.careerInterests =
                getValue("careerInterests");

            const response = await fetch(
                "/api/resume/generate-summary",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify(resumeData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to generate summary."
                );
            }

            const summaryInput =
                document.getElementById("summary");

            if (summaryInput) {
                summaryInput.value = result.summary;
            }

            // Save generated summary
            await saveResumeData();

            alert("Your personalized AI summary is ready!");

        } catch (error) {

            console.error("AI Summary Error:", error);

            alert(
                error.message ||
                "Something went wrong while generating your summary."
            );

        } finally {

            summaryBtn.disabled = false;
            summaryBtn.innerHTML = originalText;

        }

    });

}
/* =========================================================
   GENERATE RESUME BUTTON
   ========================================================= */

if (generateBtn) {

    generateBtn.addEventListener("click", function () {

        generateResume();

    });

}


/* =========================================================
   GENERATE RESUME
   ========================================================= */

function generateResume() {

    const fullName = getValue("fullName");
    const email = getValue("email");

    if (!fullName) {
        alert("Please enter your full name.");
        document.getElementById("fullName")?.focus();
        return;
    }

    if (!email) {
        alert("Please enter your email address.");
        document.getElementById("email")?.focus();
        return;
    }

    const phone = getValue("phone");
    const location = getValue("location");
    const linkedin = getValue("linkedin");
    const github = getValue("github");

    const summary = getValue("summary");

    const education = getEducation();
    const skills = getSkills();
    const projects = getProjects();
    const certifications = getCertifications();
    const experience = getExperience();
    const achievements = getAchievements();


    /* =====================================================
       CONTACT INFORMATION
       ===================================================== */

    let contactHTML = "";

    if (email) {
        contactHTML += `
            <span>📧 ${escapeHTML(email)}</span>
        `;
    }

    if (phone) {
        contactHTML += `
            <span>📱 ${escapeHTML(phone)}</span>
        `;
    }

    if (location) {
        contactHTML += `
            <span>📍 ${escapeHTML(location)}</span>
        `;
    }

    if (linkedin) {
        contactHTML += `
            <a href="${escapeHTML(linkedin)}"
               target="_blank"
               rel="noopener noreferrer">
                LinkedIn
            </a>
        `;
    }

    if (github) {
        contactHTML += `
            <a href="${escapeHTML(github)}"
               target="_blank"
               rel="noopener noreferrer">
                GitHub
            </a>
        `;
    }


    /* =====================================================
       EDUCATION HTML
       ===================================================== */

    let educationHTML = "";

    education.forEach(function (item) {

        educationHTML += `

            <div class="education-item">

                <div class="education-top">

                    <span class="education-degree">
                        ${escapeHTML(item.degree)}
                    </span>

                    <span class="education-year">
                        ${escapeHTML(item.year)}
                    </span>

                </div>

                <div class="education-college">
                    ${escapeHTML(item.college)}
                </div>

                ${
                    item.cgpa
                    ?
                    `
                    <div class="education-cgpa">
                        CGPA / Percentage:
                        ${escapeHTML(item.cgpa)}
                    </div>
                    `
                    :
                    ""
                }

            </div>

        `;

    });


    /* =====================================================
       SKILLS HTML
       ===================================================== */

    let skillsHTML = "";

    skills.forEach(function (skill) {

        skillsHTML += `

            <span class="skill-item">
                ${escapeHTML(skill)}
            </span>

        `;

    });


    /* =====================================================
       PROJECT HTML
       ===================================================== */

    let projectsHTML = "";

    projects.forEach(function (project) {

        projectsHTML += `

            <div class="project-item">

                <div class="project-title">
                    ${escapeHTML(project.name)}
                </div>

                ${
                    project.technology
                    ?
                    `
                    <div class="project-tech">
                        ${escapeHTML(project.technology)}
                    </div>
                    `
                    :
                    ""
                }

                ${
                    project.description
                    ?
                    `
                    <div class="project-description">
                        ${escapeHTML(project.description)}
                    </div>
                    `
                    :
                    ""
                }

                ${
                    project.link
                    ?
                    `
                    <div class="project-link">

                        <a href="${escapeHTML(project.link)}"
                           target="_blank"
                           rel="noopener noreferrer">

                            Project Link

                        </a>

                    </div>
                    `
                    :
                    ""
                }

            </div>

        `;

    });


    /* =====================================================
       CERTIFICATION HTML
       ===================================================== */

    let certificationsHTML = "";

    certifications.forEach(function (cert) {

        certificationsHTML += `

            <div class="certification-item">

                <div class="certification-name">
                    ${escapeHTML(cert.name)}
                </div>

                <div class="certification-details">

                    ${escapeHTML(cert.organization)}

                    ${
                        cert.year
                        ?
                        ` • ${escapeHTML(cert.year)}`
                        :
                        ""
                    }

                </div>

            </div>

        `;

    });


    /* =====================================================
       EXPERIENCE HTML
       ===================================================== */

    let experienceHTML = "";

    experience.forEach(function (item) {

        experienceHTML += `

            <div class="experience-item">

                <div class="experience-top">

                    <div>

                        <div class="experience-role">
                            ${escapeHTML(item.role)}
                        </div>

                        <div class="experience-company">
                            ${escapeHTML(item.company)}
                        </div>

                    </div>

                    <div class="experience-duration">
                        ${escapeHTML(item.duration)}
                    </div>

                </div>

                ${
                    item.description
                    ?
                    `
                    <p class="experience-description">
                        ${escapeHTML(item.description)}
                    </p>
                    `
                    :
                    ""
                }

            </div>

        `;

    });


    /* =====================================================
       ACHIEVEMENTS HTML
       ===================================================== */

    let achievementsHTML = "";

    if (achievements.length > 0) {

        achievementsHTML = `

            <ul class="achievement-list">

                ${achievements.map(function (achievement) {

                    return `
                        <li>
                            ${escapeHTML(achievement)}
                        </li>
                    `;

                }).join("")}

            </ul>

        `;

    }


    /* =====================================================
       COMPLETE RESUME
       ===================================================== */

    const resumeHTML = `

        <div class="generated-resume template-${selectedTemplate}">

            <div class="resume-header">

                ${profilePhotoData ? `<img class="resume-profile-photo" src="${profilePhotoData}" alt="Profile photo">` : ""}

                <h1>
                    ${escapeHTML(fullName)}
                </h1>

                <div class="contact-info">
                    ${contactHTML}
                </div>

            </div>


            ${
                summary
                ?
                `
                <div class="resume-section">

                    <h2>
                        Professional Summary
                    </h2>

                    <p>
                        ${escapeHTML(summary)}
                    </p>

                </div>
                `
                :
                ""
            }


            ${
                education.length > 0
                ?
                `
                <div class="resume-section">

                    <h2>
                        Education
                    </h2>

                    ${educationHTML}

                </div>
                `
                :
                ""
            }


            ${
                skills.length > 0
                ?
                `
                <div class="resume-section">

                    <h2>
                        Skills
                    </h2>

                    <div class="skills-list">
                        ${skillsHTML}
                    </div>

                </div>
                `
                :
                ""
            }


            ${
                projects.length > 0
                ?
                `
                <div class="resume-section">

                    <h2>
                        Projects
                    </h2>

                    ${projectsHTML}

                </div>
                `
                :
                ""
            }


            ${
                experience.length > 0
                ?
                `
                <div class="resume-section">

                    <h2>
                        Experience
                    </h2>

                    ${experienceHTML}

                </div>
                `
                :
                ""
            }


            ${
                certifications.length > 0
                ?
                `
                <div class="resume-section">

                    <h2>
                        Certifications
                    </h2>

                    ${certificationsHTML}

                </div>
                `
                :
                ""
            }


            ${
                achievements.length > 0
                ?
                `
                <div class="resume-section">

                    <h2>
                        Achievements
                    </h2>

                    ${achievementsHTML}

                </div>
                `
                :
                ""
            }

        </div>

    `;


    /* =====================================================
       SHOW PREVIEW
       ===================================================== */

    if (resumePreview) {
        resumePreview.innerHTML = resumeHTML;
    }


    /* =====================================================
       SHOW PREVIEW BUTTONS
       ===================================================== */

    if (previewActions) {
        previewActions.classList.add("show");
    }


    /* =====================================================
       SAVE RESUME
       ===================================================== */

    saveResumeData();


    /* =====================================================
       SCROLL TO PREVIEW
       ===================================================== */

    if (window.innerWidth < 1100 && resumePreview) {

        setTimeout(function () {

            resumePreview.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 200);

    }

}


/* =========================================================
   SAVE RESUME TO MONGODB + LOCAL STORAGE
   ========================================================= */

async function saveResumeData() {

    const data = collectResumeData();

    // Always keep a local backup.
    localStorage.setItem(
        "placeMentorResume",
        JSON.stringify({
            ...data,
            profilePhoto: profilePhotoData,
            resumeTemplate: selectedTemplate
        })
    );

    const token = localStorage.getItem("token");

    // MongoDB saving requires login.
    if (!token) {
        console.warn("Resume saved locally. Log in to sync it with MongoDB.");
        return;
    }

    try {

        const response = await fetch("/api/resume", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (response.ok) {

            console.log("Resume saved to MongoDB successfully.");

        } else {

            console.error(
                "Resume could not be saved:",
                result.message
            );

        }

    } catch (error) {

        console.error("Error connecting to resume API:", error);

    }

}
/* =========================================================
   LOAD RESUME FROM MONGODB
   ========================================================= */

async function loadResumeFromMongoDB() {

    restoreResumeExtras();

    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    try {

        const response = await fetch("/api/resume", {

            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }

        });

        if (!response.ok) {
            return;
        }

        const result = await response.json();
        const resume = result.resume;

        // No saved resume yet.
        if (!resume) {
            return;
        }

        // Restore profile photo and selected template.
        profilePhotoData = resume.profilePhoto || "";
        selectedTemplate = resume.resumeTemplate || "classic";

        if (!["classic", "modern", "minimal"].includes(selectedTemplate)) {
            selectedTemplate = "classic";
        }

        localStorage.setItem(
            "placeMentorResumeTemplate",
            selectedTemplate
        );

        setInput("fullName", resume.fullName);
        setInput("email", resume.email);
        setInput("phone", resume.phone);
        setInput("location", resume.location);
        setInput("linkedin", resume.linkedin);
        setInput("github", resume.github);

        setInput("summary", resume.summary);
        setInput("preferredRole", resume.preferredRole);
        setInput("careerInterests", resume.careerInterests);

        setInput("degree", resume.degree);
        setInput("college", resume.college);
        setInput("graduationYear", resume.graduationYear);
        setInput("cgpa", resume.cgpa);

        setInput("technicalSkills", resume.technicalSkills);
        setInput("tools", resume.tools);
        setInput("softSkills", resume.softSkills);

        setInput("projectTitle", resume.projectTitle);
        setInput("projectTech", resume.projectTech);
        setInput("projectDescription", resume.projectDescription);
        setInput("projectLink", resume.projectLink);

        setInput("certification", resume.certification);
        setInput("certOrganization", resume.certOrganization);
        setInput("certYear", resume.certYear);

        setInput("company", resume.company);
        setInput("role", resume.role);

        setInput(
            "experienceDuration",
            resume.experienceDuration
        );

        setInput(
            "experienceDescription",
            resume.experienceDescription
        );

        setInput("achievements", resume.achievements);

        // Save a local backup too.
        localStorage.setItem(
            "placeMentorResume",
            JSON.stringify({
                ...resume,
                profilePhoto: profilePhotoData,
                resumeTemplate: selectedTemplate
            })
        );

        updatePhotoPreview();
        updateTemplateSelection();

        if (getValue("fullName") && getValue("email")) {
            generateResume();
        }

        console.log("Resume loaded from MongoDB successfully.");

    } catch (error) {

        console.error(
            "Could not load resume from MongoDB:",
            error
        );

    }

}


/* =========================================================
   SET INPUT VALUE
   ========================================================= */

function setInput(id, value) {

    const element = document.getElementById(id);

    if (element && value !== undefined && value !== null) {
        element.value = value;
    }

}


/* =========================================================
   CLEAR RESUME
   ========================================================= */

if (clearBtn) {

    clearBtn.addEventListener("click", async function () {

        const confirmClear = confirm(
            "Are you sure you want to clear your resume?"
        );

        if (!confirmClear) {
            return;
        }

        const token = localStorage.getItem("token");

        // Clear all form fields.
        document.querySelectorAll("input, textarea").forEach(function (input) {
            input.value = "";
        });

        // Reset photo and template.
        resetResumeExtras();

        // Clear preview.
        if (resumePreview) {

            resumePreview.innerHTML = `

                <div class="empty-preview">

                    <div class="empty-icon">📄</div>

                    <h3>Your resume preview will appear here</h3>

                    <p>
                        Fill in your details and click
                        <strong>"Generate My Resume"</strong>.
                    </p>

                </div>

            `;

        }

        if (previewActions) {
            previewActions.classList.remove("show");
        }

        // Remove local backup.
        localStorage.removeItem("placeMentorResume");

        // Delete saved resume from MongoDB.
        if (token) {

            try {

                const response = await fetch("/api/resume", {

                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${token}`
                    }

                });

                const result = await response.json();

                if (response.ok) {

                    console.log(
                        "Resume deleted from MongoDB:",
                        result.message
                    );

                } else {

                    console.error(
                        "Could not delete MongoDB resume:",
                        result.message
                    );

                }

            } catch (error) {

                console.error("Delete resume error:", error);

            }

        }

    });

}


/* =========================================================
   PRINT / SAVE AS PDF
   ========================================================= */

if (printBtn) {

    printBtn.addEventListener("click", function () {

        window.print();

    });

}


/* =========================================================
   CREATE NEW RESUME
   ========================================================= */

if (newResumeBtn) {

    newResumeBtn.addEventListener("click", async function () {

        const confirmNew = confirm(
            "Start a new resume? Your current resume will be cleared."
        );

        if (!confirmNew) {
            return;
        }

        const inputs = document.querySelectorAll("input, textarea");

        inputs.forEach(function (input) {
            input.value = "";
        });

        localStorage.removeItem("placeMentorResume");

        const token = localStorage.getItem("token");

        // Delete MongoDB copy.
        if (token) {

            try {

                const response = await fetch("/api/resume", {

                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${token}`
                    }

                });

                console.log(
                    "MongoDB resume reset:",
                    response.status
                );

            } catch (error) {

                console.error(
                    "Could not reset MongoDB resume:",
                    error
                );

            }

        }

        resetResumeExtras();

        if (resumePreview) {

            resumePreview.innerHTML = `

                <div class="empty-preview">

                    <div class="empty-icon">📄</div>

                    <h3>Start building your resume</h3>

                    <p>
                        Add your information on the left
                        and generate your professional resume.
                    </p>

                </div>

            `;

        }

        if (previewActions) {
            previewActions.classList.remove("show");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   AUTO SAVE
   ========================================================= */

document.addEventListener("input", function (event) {

    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) {

        clearTimeout(window.resumeSaveTimer);

        window.resumeSaveTimer = setTimeout(function () {

            saveResumeData();

        }, 1000);

    }

});


/* =========================================================
   LOAD SAVED RESUME
   ========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    function () {

        restoreResumeExtras();
        updateTemplateSelection();
        loadResumeFromMongoDB();

    }
);