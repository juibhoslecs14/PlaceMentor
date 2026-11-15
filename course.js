
/* =====================================
   PLACEMENTOR COURSE RECOMMENDATIONS
===================================== */

const API_URL = "/api/courses";
const token = localStorage.getItem("token");

const recommendationData = {

    "Programming": {
        aiMessage: "Start with programming fundamentals and gradually improve your coding and problem-solving skills.",
        courses: [
            {
                title: "Python for Beginners",
                platform: "Coursera",
                description: "Learn Python basics, variables, loops, functions and problem-solving.",
                level: "Beginner",
                duration: "4 Weeks",
                image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
                link: "https://www.coursera.org/learn/python"
            },
            {
                title: "Java Programming",
                platform: "Great Learning",
                description: "Understand Java syntax, object-oriented programming and basic applications.",
                level: "Beginner",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
                link: "https://www.mygreatlearning.com/academy/learn-for-free/courses/java-programming"
            },
            {
                title: "C Programming",
                platform: "W3Schools",
                description: "Learn C programming concepts, operators, loops and functions.",
                level: "Beginner",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
                link: "https://www.w3schools.com/c/"
            }
        ],
        certifications: [
            ["Python Programming Certificate", "Coursera", "🎓", "https://www.coursera.org/learn/python"],
            ["Java Programming", "Great Learning Academy", "🏅", "https://www.mygreatlearning.com/academy"]
        ],
        skills: ["C Programming", "Python", "Java", "OOP", "Problem Solving", "Debugging"],
        project: ["Student Management System", "Create an application to store, update, search and manage student records using a programming language."]
    },

    "Web Development": {
        aiMessage: "Build a strong web development foundation by learning HTML, CSS and JavaScript. Then create projects to improve your practical skills.",
        courses: [
            {
                title: "HTML and CSS Fundamentals",
                platform: "freeCodeCamp",
                description: "Learn how to structure web pages and design attractive websites.",
                level: "Beginner",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
                link: "https://www.freecodecamp.org/learn/"
            },
            {
                title: "JavaScript for Beginners",
                platform: "W3Schools",
                description: "Understand JavaScript variables, functions, events and DOM manipulation.",
                level: "Beginner",
                duration: "4 Weeks",
                image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
                link: "https://www.w3schools.com/js/"
            },
            {
                title: "Responsive Web Design",
                platform: "freeCodeCamp",
                description: "Learn responsive layouts, Flexbox, CSS Grid and mobile-friendly design.",
                level: "Intermediate",
                duration: "4 Weeks",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/"
            }
        ],
        certifications: [
            ["Responsive Web Design", "freeCodeCamp", "🎓", "https://www.freecodecamp.org/learn/2022/responsive-web-design/"],
            ["JavaScript Algorithms", "freeCodeCamp", "🏅", "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/"]
        ],
        skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "DOM", "Git and GitHub"],
        project: ["Personal Portfolio Website", "Build a responsive portfolio website containing your introduction, education, technical skills, projects and contact details."]
    },

    "DSA": {
        aiMessage: "Data Structures and Algorithms are important for technical interviews. Begin with arrays and gradually move towards advanced problem-solving.",
        courses: [
            {
                title: "DSA Fundamentals",
                platform: "GeeksforGeeks",
                description: "Understand data structures and algorithms with beginner-friendly examples.",
                level: "Beginner",
                duration: "4 Weeks",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
                link: "https://www.geeksforgeeks.org/data-structures/"
            },
            {
                title: "Algorithms Specialization",
                platform: "Coursera",
                description: "Study algorithm design, analysis and problem-solving techniques.",
                level: "Intermediate",
                duration: "6 Weeks",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
                link: "https://www.coursera.org/specializations/algorithms"
            },
            {
                title: "Coding Practice",
                platform: "HackerRank",
                description: "Improve coding skills through practical programming challenges.",
                level: "Intermediate",
                duration: "Self-paced",
                image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
                link: "https://www.hackerrank.com/domains/algorithms"
            }
        ],
        certifications: [
            ["DSA Learning Path", "GeeksforGeeks", "🎓", "https://www.geeksforgeeks.org/"],
            ["Problem Solving", "HackerRank", "🏅", "https://www.hackerrank.com/skills-directory"]
        ],
        skills: ["Arrays", "Strings", "Linked Lists", "Stacks", "Queues", "Trees", "Sorting", "Searching"],
        project: ["Algorithm Visualizer", "Create a simple application that visually demonstrates sorting and searching algorithms."]
    },

    "DBMS": {
        aiMessage: "Database knowledge is essential for software development. Focus on SQL queries, relationships, normalization and database design.",
        courses: [
            {
                title: "SQL for Beginners",
                platform: "W3Schools",
                description: "Learn SQL commands to create, retrieve and manage database records.",
                level: "Beginner",
                duration: "2 Weeks",
                image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
                link: "https://www.w3schools.com/sql/"
            },
            {
                title: "Database Management",
                platform: "Great Learning",
                description: "Understand database concepts, tables, keys and relationships.",
                level: "Beginner",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
                link: "https://www.mygreatlearning.com/academy"
            },
            {
                title: "Advanced SQL Practice",
                platform: "HackerRank",
                description: "Practice SQL queries, joins, grouping and database problems.",
                level: "Intermediate",
                duration: "Self-paced",
                image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373",
                link: "https://www.hackerrank.com/domains/sql"
            }
        ],
        certifications: [
            ["SQL Certificate", "HackerRank", "🎓", "https://www.hackerrank.com/skills-directory"],
            ["Database Courses", "Great Learning", "🏅", "https://www.mygreatlearning.com/academy"]
        ],
        skills: ["SQL", "MySQL", "MongoDB", "Normalization", "ER Diagrams", "Database Design"],
        project: ["Library Management Database", "Design a database to manage books, student details, book issuing and return records."]
    },

    "Networks": {
        aiMessage: "Develop a clear understanding of networking concepts, communication protocols and network security.",
        courses: [
            {
                title: "Computer Networking Basics",
                platform: "Cisco",
                description: "Learn networking fundamentals, devices and communication concepts.",
                level: "Beginner",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
                link: "https://www.netacad.com/"
            },
            {
                title: "Networking Fundamentals",
                platform: "Coursera",
                description: "Explore network architecture, protocols and network communication.",
                level: "Beginner",
                duration: "4 Weeks",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
                link: "https://www.coursera.org/"
            },
            {
                title: "Network Security",
                platform: "Cisco",
                description: "Understand basic security concepts and network protection.",
                level: "Intermediate",
                duration: "4 Weeks",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
                link: "https://www.netacad.com/"
            }
        ],
        certifications: [
            ["Networking Basics", "Cisco Networking Academy", "🎓", "https://www.netacad.com/"],
            ["Network Security Learning", "Cisco", "🏅", "https://www.netacad.com/"]
        ],
        skills: ["OSI Model", "TCP/IP", "IP Addressing", "DNS", "HTTP", "Routing", "Network Security"],
        project: ["Network Design Simulation", "Design a small office network showing computers, switches, routers and their connections."]
    },

    "OS": {
        aiMessage: "Operating systems are a core computer science subject. Focus on processes, memory, scheduling and file management.",
        courses: [
            {
                title: "Operating Systems Basics",
                platform: "NPTEL",
                description: "Learn operating system concepts and how computer resources are managed.",
                level: "Beginner",
                duration: "4 Weeks",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
                link: "https://nptel.ac.in/"
            },
            {
                title: "Operating System Concepts",
                platform: "Coursera",
                description: "Explore process management, memory and operating system architecture.",
                level: "Intermediate",
                duration: "5 Weeks",
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
                link: "https://www.coursera.org/"
            },
            {
                title: "Linux Fundamentals",
                platform: "Cisco",
                description: "Learn Linux commands, file systems and basic system administration.",
                level: "Beginner",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97",
                link: "https://www.netacad.com/"
            }
        ],
        certifications: [
            ["Linux Fundamentals", "Cisco", "🎓", "https://www.netacad.com/"],
            ["Operating Systems Learning", "NPTEL", "🏅", "https://nptel.ac.in/"]
        ],
        skills: ["Process Management", "CPU Scheduling", "Memory Management", "Deadlocks", "Linux", "File Systems"],
        project: ["CPU Scheduling Simulator", "Build a simple program that demonstrates FCFS, SJF and Round Robin CPU scheduling."]
    },

    "Aptitude": {
        aiMessage: "Aptitude preparation improves your speed and accuracy in placement tests. Practice numerical ability and logical reasoning regularly.",
        courses: [
            {
                title: "Quantitative Aptitude",
                platform: "IndiaBix",
                description: "Practice percentages, ratios, averages and numerical problems.",
                level: "Beginner",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
                link: "https://www.indiabix.com/aptitude/questions-and-answers/"
            },
            {
                title: "Logical Reasoning",
                platform: "IndiaBix",
                description: "Improve reasoning skills through puzzles, series and patterns.",
                level: "Beginner",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1509869175650-a1d97972541a",
                link: "https://www.indiabix.com/logical-reasoning/questions-and-answers/"
            },
            {
                title: "Placement Preparation",
                platform: "GeeksforGeeks",
                description: "Practice placement aptitude questions and interview exercises.",
                level: "Intermediate",
                duration: "Self-paced",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
                link: "https://www.geeksforgeeks.org/"
            }
        ],
        certifications: [
            ["Aptitude Practice", "IndiaBix", "🎓", "https://www.indiabix.com/"],
            ["Placement Preparation", "GeeksforGeeks", "🏅", "https://www.geeksforgeeks.org/"]
        ],
        skills: ["Percentages", "Ratios", "Averages", "Time and Work", "Reasoning", "Problem Solving"],
        project: ["Aptitude Practice Tracker", "Create a simple tracker to record practice questions, correct answers and time taken."]
    },

    "Communication": {
        aiMessage: "Good communication helps you perform confidently in interviews and group discussions. Improve your speaking, listening and presentation skills.",
        courses: [
            {
                title: "Improve English Communication",
                platform: "Coursera",
                description: "Develop English speaking, listening and communication skills.",
                level: "Beginner",
                duration: "4 Weeks",
                image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
                link: "https://www.coursera.org/"
            },
            {
                title: "Public Speaking",
                platform: "Great Learning",
                description: "Learn how to present ideas clearly and speak confidently.",
                level: "Beginner",
                duration: "2 Weeks",
                image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
                link: "https://www.mygreatlearning.com/academy"
            },
            {
                title: "Business Communication",
                platform: "Coursera",

                description: "Improve professional writing, teamwork and workplace communication.",
                level: "Intermediate",
                duration: "4 Weeks",
                image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
                link: "https://www.coursera.org/"
            }
        ],
        certifications: [
            ["Communication Skills", "Great Learning", "🎓", "https://www.mygreatlearning.com/academy"],
            ["Public Speaking Courses", "Coursera", "🏅", "https://www.coursera.org/"]
        ],
        skills: ["English Speaking", "Listening", "Presentation", "Teamwork", "Body Language", "Public Speaking"],
        project: ["Personal Introduction Video", "Record a short professional introduction covering your education, skills, interests and career goals."]
    },

    "Resume": {
        aiMessage: "A good resume highlights your education, technical skills and projects. Keep it clear, professional and relevant to the job.",
        courses: [
            {
                title: "Resume Writing Guide",
                platform: "Coursera",
                description: "Learn how to structure a professional resume for job applications.",
                level: "Beginner",
                duration: "1 Week",
                image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
                link: "https://www.coursera.org/"
            },
            {
                title: "Career Development",
                platform: "LinkedIn Learning",
                description: "Understand professional profiles and career preparation.",
                level: "Beginner",
                duration: "2 Weeks",
                image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
                link: "https://www.linkedin.com/learning/"
            },
            {
                title: "Resume and Cover Letter",
                platform: "Indeed",
                description: "Explore resume writing tips and job application guidance.",
                level: "Beginner",
                duration: "Self-paced",
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
                link: "https://in.indeed.com/career-advice/resumes-cover-letters"
            }
        ],
        certifications: [
            ["Career Development Courses", "LinkedIn Learning", "🎓", "https://www.linkedin.com/learning/"],
            ["Resume Writing Resources", "Indeed", "🏅", "https://in.indeed.com/career-advice/resumes-cover-letters"]
        ],
        skills: ["Resume Formatting", "Professional Summary", "Technical Skills", "Project Description", "LinkedIn Profile"],
        project: ["Create Your Professional Resume", "Prepare a one-page resume containing your education, technical skills, projects, achievements and contact details."]
    },

    "Interview": {
        aiMessage: "Prepare for technical and HR interviews by revising core subjects, practising common questions and improving your confidence.",
        courses: [
            {
                title: "Interview Preparation",
                platform: "GeeksforGeeks",
                description: "Explore technical interview questions and placement preparation resources.",
                level: "Beginner",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
                link: "https://www.geeksforgeeks.org/"
            },
            {
                title: "Technical Interview Skills",
                platform: "Coursera",
                description: "Learn strategies for technical interviews and problem-solving rounds.",
                level: "Intermediate",
                duration: "3 Weeks",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
                link: "https://www.coursera.org/"
            },
            {
                title: "HR Interview Preparation",
                platform: "Indeed",
                description: "Prepare for common HR questions and professional interviews.",
                level: "Beginner",
                duration: "2 Weeks",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
                link: "https://in.indeed.com/career-advice/interviewing"
            }
        ],
        certifications: [
            ["Interview Preparation Resources", "GeeksforGeeks", "🎓", "https://www.geeksforgeeks.org/"],
            ["Career Skills", "LinkedIn Learning", "🏅", "https://www.linkedin.com/learning/"]
        ],
        skills: ["Self Introduction", "Technical Knowledge", "HR Questions", "Confidence", "Problem Solving", "Communication"],
        project: ["Mock Interview Preparation", "Prepare answers for 10 common HR questions and 10 technical questions, then practise speaking them aloud."]
    }
};


// Keep track of completed courses

/* =====================================
   USER LEARNING INTERESTS & PROGRESS
===================================== */

let completedCourses = [];
let selectedTopics = [];


// Load saved course progress from MongoDB
async function loadCourseProgress() {
    if (!token) {
        updateProgressBars();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/progress`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Could not load course progress");
        }

        const data = await response.json();

        const records = Array.isArray(data)
            ? data
            : (data.progress || data.completedCourses || []);

        if (Array.isArray(records)) {
            completedCourses = records.map(item => ({
                topic: item.topic,
                courseTitle: item.courseTitle,
                platform: item.platform
            }));
        }

        updateProgressBars();

    } catch (error) {
        console.error("Course progress:", error);
        updateProgressBars();
    }
}


// Load previously saved learning interests
async function loadLearningInterests() {
    if (!token) {
        document.getElementById("interestMessage").textContent =
            "Please log in to save your learning preferences.";

        renderRecommendations([]);
        return;
    }

    try {
        const response = await fetch(
            "/api/learning-interests",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load learning interests");
        }

        const data = await response.json();

        selectedTopics = data.learningInterests || [];

        // Restore previously selected checkboxes
        document.querySelectorAll(
            "#interestGrid input[type='checkbox']"
        ).forEach(checkbox => {
            checkbox.checked = selectedTopics.includes(checkbox.value);
        });

        renderRecommendations(selectedTopics);

    } catch (error) {
        console.error("Learning interests:", error);

        document.getElementById("interestMessage").textContent =
            "Unable to load your saved preferences.";
    }
}


// Save selected interests to MongoDB
async function saveLearningInterests() {
    if (!token) {
        alert("Please log in to save your preferences.");
        return;
    }

    const checkboxes = document.querySelectorAll(
        "#interestGrid input[type='checkbox']:checked"
    );

    const interests = Array.from(checkboxes).map(
        checkbox => checkbox.value
    );

    const message = document.getElementById("interestMessage");
    const saveButton = document.getElementById("saveInterestsBtn");

    try {
        saveButton.disabled = true;
        saveButton.textContent = "Saving...";

        const response = await fetch(
            "/api/learning-interests",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    learningInterests: interests
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to save preferences");
        }

        selectedTopics = data.learningInterests || interests;

        renderRecommendations(selectedTopics);

        message.textContent = "Your learning interests have been saved successfully! ✓";
        message.style.color = "#55764b";

    } catch (error) {
        console.error("Save interests:", error);

        message.textContent = error.message;
        message.style.color = "#b54b4b";

    } finally {
        saveButton.disabled = false;
        saveButton.textContent = "Save My Interests";
    }
}


// Add a heading for each selected topic
function addTopicHeading(container, topic) {
    const heading = document.createElement("h3");

    heading.className = "topic-recommendation-heading";
    heading.textContent = topic;

    container.appendChild(heading);
}


// Display courses for a topic
function displayCourses(topic, clear = true) {
    const container = document.getElementById("courseContainer");
    if (!container) return;

    if (clear) container.innerHTML = "";

    addTopicHeading(container, topic);

    recommendationData[topic].courses.forEach(course => {

        const isCompleted = completedCourses.some(item =>
            item.topic === topic &&
            item.courseTitle === course.title
        );

        const card = document.createElement("div");
        card.className = "course-card";

        const image = document.createElement("img");
        image.className = "course-image";
        image.src = course.image;
        image.alt = course.title;
        image.loading = "lazy";

        image.onerror = function () {
            this.style.display = "none";
        };

        const content = document.createElement("div");
        content.className = "course-content";

        const platform = document.createElement("span");
        platform.className = "course-platform";
        platform.textContent = course.platform;

        const title = document.createElement("h3");
        title.textContent = course.title;

        const description = document.createElement("p");
        description.className = "course-description";
        description.textContent = course.description;

        const details = document.createElement("div");
        details.className = "course-details";

        const level = document.createElement("span");
        level.textContent = "📊 " + course.level;

        const duration = document.createElement("span");
        duration.textContent = "⏱ " + course.duration;

        details.append(level, duration);

        const actions = document.createElement("div");
        actions.className = "course-actions";

        const startButton = document.createElement("a");
        startButton.className = "start-course-btn";
        startButton.href = course.link;
        startButton.target = "_blank";
        startButton.rel = "noopener noreferrer";
        startButton.textContent = "Start Learning ↗";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-course-btn";
        completeButton.textContent = isCompleted
            ? "✓ Completed"
            : "Mark Complete";

        if (isCompleted) {
            completeButton.classList.add("completed");
        }

        completeButton.addEventListener("click", () => {
            markCourseComplete(course.title, course.platform, topic);
        });

        actions.append(startButton, completeButton);

        content.append(platform, title, description, details, actions);
        card.append(image, content);

        container.appendChild(card);
    });
}


// Display certifications
function displayCertifications(topic, clear = true) {
    const container = document.getElementById("certificationContainer");
    if (!container) return;

    if (clear) container.innerHTML = "";

    addTopicHeading(container, topic);

    recommendationData[topic].certifications.forEach(cert => {

        const card = document.createElement("div");
        card.className = "certification-card";

        const icon = document.createElement("div");
        icon.className = "certification-icon";
        icon.textContent = cert[2];

        const content = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = cert[0];

        const platform = document.createElement("p");
        platform.textContent = cert[1];

        const link = document.createElement("a");
        link.href = cert[3];
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Explore certification ↗";

        content.append(title, platform, link);
        card.append(icon, content);

        container.appendChild(card);
    });
}


// Display skills
function displaySkills(topic, clear = true) {
    const container = document.getElementById("skillsContainer");
    if (!container) return;

    if (clear) container.innerHTML = "";

    addTopicHeading(container, topic);

    recommendationData[topic].skills.forEach(skill => {

        const tag = document.createElement("span");
        tag.className = "skill-tag";
        tag.textContent = skill;

        container.appendChild(tag);
    });
}


// Display practice projects
function displayProject(topic, clear = true) {
    const container = document.getElementById("projectContainer");
    if (!container) return;

    if (clear) container.innerHTML = "";

    addTopicHeading(container, topic);

    const project = recommendationData[topic].project;

    const card = document.createElement("div");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project[0];

    const description = document.createElement("p");
    description.textContent = project[1];

    card.append(title, description);
    container.appendChild(card);
}


// Save a completed course
async function markCourseComplete(courseTitle, platform, topic) {

    const alreadyCompleted = completedCourses.some(course =>
        course.courseTitle === courseTitle &&
        course.topic === topic
    );

    if (alreadyCompleted) {
        alert("You have already marked this course as completed!");
        return;
    }

    if (!token) {
        alert("Please log in to save your course progress.");
        return;
    }

    const newCourse = {
        topic,
        courseTitle,
        platform
    };

    try {
        const response = await fetch(`${API_URL}/complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newCourse)
        });

        if (!response.ok) {
            throw new Error("Could not save course progress");
        }

        completedCourses.push(newCourse);

        renderRecommendations(selectedTopics);
        updateProgressBars();

        alert("Course marked as completed! Great work 🎉");

    } catch (error) {
        console.error(error);

        alert("Unable to save your progress. Please check your backend connection.");
    }
}


// Update the learning progress bars
function updateProgressBars() {

    const progressTopics = [
        {
            topic: "Web Development",
            courseNames: [
                "HTML and CSS Fundamentals",
                "JavaScript for Beginners",
                "Responsive Web Design"
            ],
            percentId: "htmlPercent",
            barId: "htmlProgress"
        },
        {
            topic: "Programming",
            courseNames: [
                "Python for Beginners",
                "Java Programming",
                "C Programming"
            ],
            percentId: "javaPercent",
            barId: "javaProgress"
        },
        {
            topic: "DBMS",
            courseNames: [
                "SQL for Beginners",
                "Database Management",
                "Advanced SQL Practice"
            ],
            percentId: "dbmsPercent",
            barId: "dbmsProgress"
        }
    ];

    progressTopics.forEach(item => {

        const completed = completedCourses.filter(course =>
            course.topic === item.topic &&
            item.courseNames.includes(course.courseTitle)
        ).length;

        const percentage = Math.round(
            (completed / item.courseNames.length) * 100
        );

        const percentElement = document.getElementById(item.percentId);
        const barElement = document.getElementById(item.barId);

        if (percentElement) {
            percentElement.textContent = percentage + "%";
        }

        if (barElement) {
            barElement.style.width = percentage + "%";
        }
    });
}

/* =====================================
   RENDER ALL RECOMMENDATIONS
===================================== */

function renderRecommendations(topics) {

    const courseContainer = document.getElementById("courseContainer");
    const certificationContainer = document.getElementById("certificationContainer");
    const skillsContainer = document.getElementById("skillsContainer");
    const projectContainer = document.getElementById("projectContainer");
    const aiRecommendation = document.getElementById("aiRecommendation");

    // Clear previous recommendations
    if (courseContainer) courseContainer.innerHTML = "";
    if (certificationContainer) certificationContainer.innerHTML = "";
    if (skillsContainer) skillsContainer.innerHTML = "";
    if (projectContainer) projectContainer.innerHTML = "";

    // Display message when no interests are selected
    if (!topics || topics.length === 0) {

        if (aiRecommendation) {
            aiRecommendation.textContent =
                "Select your learning interests above to receive personalized course recommendations.";
        }

        return;
    }

    // Display recommendations for every selected topic
    topics.forEach((topic, index) => {

        if (!recommendationData[topic]) return;

        if (aiRecommendation) {
            aiRecommendation.textContent =
                "Your personalized learning roadmap is ready! Explore the recommended courses, certifications, skills and projects below.";
        }

        displayCourses(topic, index === 0);
        displayCertifications(topic, index === 0);
        displaySkills(topic, index === 0);
        displayProject(topic, index === 0);
    });
}


/* =====================================
   INITIALIZE COURSE RECOMMENDATION PAGE
===================================== */

async function initializeCoursePage() {

    // Load completed courses first
    await loadCourseProgress();

    // Load saved interests and display recommendations
    await loadLearningInterests();
}


/* =====================================
   SAVE BUTTON EVENT LISTENER
===================================== */

const saveInterestsBtn = document.getElementById("saveInterestsBtn");

if (saveInterestsBtn) {
    saveInterestsBtn.addEventListener("click", saveLearningInterests);
}


/* =====================================
   START COURSE PAGE
===================================== */

initializeCoursePage();
