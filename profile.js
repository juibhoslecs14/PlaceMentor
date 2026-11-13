
// =====================================
// PLACEMENTOR PROFILE JAVASCRIPT
// =====================================

let currentUser = null;

// Load logged-in user's profile
async function loadProfile() {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch("/api/profile", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to load profile.");
        }

        currentUser = data.user;

        displayProfile(currentUser);

    } catch (error) {

        console.error("Profile loading error:", error);
        alert(error.message);

    }
}


// Display profile information
function displayProfile(user) {

    document.getElementById("profileName").textContent =
        user.name || "Not available";

    document.getElementById("profileEmail").textContent =
        user.email || "Not available";

    document.getElementById("nameValue").textContent =
        user.name || "Not available";

    document.getElementById("emailValue").textContent =
        user.email || "Not available";

    document.getElementById("collegeValue").textContent =
        user.college || "Not provided";

    document.getElementById("courseValue").textContent =
        user.course || "Not provided";

    document.getElementById("departmentValue").textContent =
        user.department || "Not provided";
}


// Show edit form
function showEditForm() {

    if (!currentUser) return;

    document.getElementById("editName").value =
        currentUser.name || "";

    document.getElementById("editCollege").value =
        currentUser.college || "";

    document.getElementById("editCourse").value =
        currentUser.course || "";

    document.getElementById("editDepartment").value =
        currentUser.department || "";

    document.getElementById("editProfileForm").style.display = "block";

    document.getElementById("editProfileBtn").style.display = "none";
}


// Hide edit form
function hideEditForm() {

    document.getElementById("editProfileForm").style.display = "none";

    document.getElementById("editProfileBtn").style.display = "inline-block";
}


// Save profile changes
async function saveProfile() {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please log in again.");
        window.location.href = "login.html";
        return;
    }

    const name = document.getElementById("editName").value.trim();
    const college = document.getElementById("editCollege").value.trim();
    const course = document.getElementById("editCourse").value.trim();
    const department = document.getElementById("editDepartment").value.trim();

    if (!name) {
        alert("Please enter your full name.");
        return;
    }

    const saveButton = document.querySelector(
        "#editProfileForm button[onclick='saveProfile()']"
    );

    saveButton.disabled = true;
    saveButton.textContent = "Saving...";

    try {

        const response = await fetch("/api/profile", {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                name,
                college,
                course,
                department
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to update profile.");
        }

        currentUser = data.user;

        displayProfile(currentUser);

        localStorage.setItem("user", JSON.stringify(currentUser));

        alert("Profile updated successfully!");

        hideEditForm();

    } catch (error) {

        console.error("Profile update error:", error);
        alert(error.message);

    } finally {

        saveButton.disabled = false;
        saveButton.textContent = "Save Changes";

    }
}


// Logout
function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("You have been logged out successfully.");

    window.location.href = "login.html";
}


// Load profile when page opens
loadProfile();
