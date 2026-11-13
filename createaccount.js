
// ==========================================
// PLACEMENTOR - CREATE ACCOUNT
// ==========================================

const signupForm = document.getElementById("signupForm");

const passwordInput = document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const togglePassword =
    document.getElementById("togglePassword");

const signupButton =
    signupForm.querySelector(".signup-btn");


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

togglePassword.addEventListener("change", function () {

    const inputType = this.checked ? "text" : "password";

    passwordInput.type = inputType;
    confirmPasswordInput.type = inputType;

});


// ==========================================
// USER REGISTRATION
// ==========================================

signupForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const college =
        document.getElementById("college").value.trim();

    const course =
        document.getElementById("course").value;

    const department =
        document.getElementById("department").value.trim();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    // Check required fields

    if (!name || !email || !password || !confirmPassword) {

        alert("Please fill all the required fields.");
        return;

    }


    // Check password length

    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");
        return;

    }


    // Check password match

    if (password !== confirmPassword) {

        alert("Passwords do not match!");
        return;

    }


    try {

        signupButton.disabled = true;
        signupButton.innerText = "Creating Account...";


        // Send registration details to backend

        const response = await fetch("/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name,
                email,
                password,
                college,
                course,
                department

            })

        });


        const data = await response.json();


        // Registration successful

        if (response.ok) {

            alert("Account created successfully! Please login.");

            window.location.href = "login.html";

        } else {

            alert(data.message || "Registration failed.");

            signupButton.disabled = false;
            signupButton.innerText = "Create Account";

        }

    } catch (error) {

        console.error("Registration error:", error);

        alert("Unable to connect to the server. Please try again.");

        signupButton.disabled = false;
        signupButton.innerText = "Create Account";

    }

});
