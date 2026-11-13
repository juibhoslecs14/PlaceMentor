
// ==========================================
// PLACE MENTOR - USER LOGIN
// ==========================================


// Get HTML elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const toggleLoginPassword =
    document.getElementById("toggleLoginPassword");

const loginButton =
    document.querySelector(".login-btn");


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

if (toggleLoginPassword) {

    toggleLoginPassword.addEventListener("change", function () {

        if (this.checked) {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }

    });

}


// ==========================================
// LOGIN FUNCTION
// ==========================================

async function login() {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Check required fields
    if (!email || !password) {

        alert("Please enter your email and password.");
        return;

    }

    const originalButtonText = loginButton.innerText;

    try {

        // Show loading status
        loginButton.disabled = true;
        loginButton.innerText = "Logging in...";


        // Send login details to backend
        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });


        const data = await response.json();


        // Check login response
        if (response.ok) {

            // Save JWT token
            localStorage.setItem(
                "token",
                data.token
            );

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("Login successful! Welcome to PlaceMentor.");

            // Redirect to dashboard
            window.location.href = "dashboard.html";

        } else {

            alert(
                data.message ||
                "Invalid email or password."
            );

            loginButton.disabled = false;
            loginButton.innerText = originalButtonText;

        }

    } catch (error) {

        console.error("Login error:", error);

        alert("Unable to connect to the server. Please try again.");

        loginButton.disabled = false;
        loginButton.innerText = originalButtonText;

    }

}


// ==========================================
// SUPPORT ENTER KEY
// ==========================================

const loginForm =
    document.querySelector(".login-left form");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();
        login();

    });

}
