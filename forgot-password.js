
// =====================================
// PLACEMENTOR FORGOT PASSWORD
// =====================================

document.getElementById("forgotPasswordForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("forgotMessage");

        const button =
            document.getElementById("forgotPasswordBtn");

        try {

            button.disabled = true;
            button.textContent = "Sending...";

            message.textContent = "";

            const response = await fetch("/api/auth/forgot-password", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email
                })

            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to send reset link."
                );
            }

            message.textContent = data.message;

            message.style.color = "#16803c";

            document.getElementById("forgotPasswordForm").reset();

        } catch (error) {

            console.error("Forgot password error:", error);

            message.textContent = error.message;

            message.style.color = "#b42318";

        } finally {

            button.disabled = false;
            button.textContent = "Send Reset Link";

        }

    });
