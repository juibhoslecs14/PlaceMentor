
// =====================================
// PLACEMENTOR SETTINGS
// =====================================


// Get authentication token
function getToken() {
    return localStorage.getItem("token");
}


// Load logged-in user's account information
async function loadSettingsProfile() {

    const token = getToken();

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
            throw new Error(data.message || "Unable to load account information.");
        }

        document.getElementById("settingsName").textContent =
            data.user.name || "Not available";

        document.getElementById("settingsEmail").textContent =
            data.user.email || "Not available";

    } catch (error) {
        console.error("Settings profile error:", error);

        document.getElementById("settingsName").textContent =
            "Unable to load";

        document.getElementById("settingsEmail").textContent =
            "Unable to load";
    }
}


// Load preferences from MongoDB
async function loadPreferences() {

    const token = getToken();

    try {
        const response = await fetch("/api/settings", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to load settings.");
        }

        const preferences = data.preferences || {};

        document.getElementById("comfortableLayout").checked =
            preferences.comfortableLayout ?? false;

        document.getElementById("learningReminders").checked =
            preferences.learningReminders ?? false;

        document.getElementById("courseUpdates").checked =
            preferences.courseUpdates ?? false;

        applyLayoutPreference();

    } catch (error) {
        console.error("Settings loading error:", error);

        showSettingsMessage(
            "Unable to load your saved preferences.",
            true
        );
    }
}


// Apply comfortable layout preference
function applyLayoutPreference() {

    const comfortableLayout =
        document.getElementById("comfortableLayout").checked;

    const settingsPage =
        document.querySelector(".settings-page");

    if (settingsPage) {
        settingsPage.classList.toggle(
            "comfortable-layout",
            comfortableLayout
        );
    }
}


// Show success or error message
function showSettingsMessage(message, isError = false) {

    const messageElement =
        document.getElementById("settingsMessage");

    messageElement.textContent = message;

    messageElement.style.color =
        isError ? "#b42318" : "#6b4226";

    setTimeout(() => {
        messageElement.textContent = "";
    }, 3000);
}


// Save preferences to MongoDB
async function saveSettings() {

    const token = getToken();

    const button =
        document.getElementById("saveSettingsBtn");

    const preferences = {

        comfortableLayout:
            document.getElementById("comfortableLayout").checked,

        learningReminders:
            document.getElementById("learningReminders").checked,

        courseUpdates:
            document.getElementById("courseUpdates").checked
    };

    try {

        button.disabled = true;
        button.textContent = "Saving...";

        const response = await fetch("/api/settings", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(preferences)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to save settings.");
        }

        applyLayoutPreference();

        showSettingsMessage(
            "Your preferences have been saved successfully!"
        );

    } catch (error) {

        console.error("Settings saving error:", error);

        showSettingsMessage(
            error.message || "Unable to save settings.",
            true
        );

    } finally {

        button.disabled = false;
        button.textContent = "Save Settings";
    }
}


// Change logged-in user's password
async function changePassword() {

    const form = document.getElementById("changePasswordForm");
    const message = document.getElementById("passwordMessage");
    const button = document.getElementById("changePasswordBtn");

    const currentPassword =
        document.getElementById("currentPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        message.textContent = "New passwords do not match.";
        message.style.color = "#b42318";
        return;
    }

    if (newPassword.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        message.style.color = "#b42318";
        return;
    }

    try {
        button.disabled = true;
        button.textContent = "Updating...";

        const response = await fetch("/api/auth/change-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to change password.");
        }

        message.textContent = data.message || "Password changed successfully!";
        message.style.color = "#16803c";

        form.reset();

    } catch (error) {
        console.error("Change password error:", error);

        message.textContent = error.message;
        message.style.color = "#b42318";

    } finally {
        button.disabled = false;
        button.textContent = "Change Password";
    }
}



// Initialize Settings Page
document.addEventListener("DOMContentLoaded", () => {

    loadSettingsProfile();

    loadPreferences();

    document.getElementById("comfortableLayout")
        .addEventListener("change", applyLayoutPreference);

    document.getElementById("saveSettingsBtn")
        .addEventListener("click", saveSettings);

});
