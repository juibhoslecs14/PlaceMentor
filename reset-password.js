
// =====================================
// PLACEMENTOR RESET PASSWORD
// =====================================

// Get token and email from reset link
const params = new URLSearchParams(window.location.search);

const resetToken = params.get("token");
const resetEmail = params.get("email");


// Handle password reset form
document.getElementById("resetPasswordForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("resetMessage");

        const button =
            document.getElementById("resetPasswordBtn");

        // Check reset link
        if (!resetToken || !resetEmail) {
            message.textContent =
                "Invalid reset link. Please request a new one.";

            message.style.color = "#b42318";
            return;
        }

        // Check password match
        if (newPassword !== confirmPassword) {
            message.textContent =
                "Passwords do not match.";

            message.style.color = "#b42318";
            return;
        }

        // Check password length
        if (newPassword.length < 6) {
            message.textContent =
                "Password must contain at least 6 characters.";

            message.style.color = "#b42318";
            return;
        }

        try {

            button.disabled = true;
            button.textContent = "Resetting...";

            const response = await fetch("/api/auth/reset-password", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: resetEmail,
                    token: resetToken,
                    newPassword: newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to reset password."
                );
            }

            message.textContent =
                data.message || "Password reset successfully!";

            message.style.color = "#16803c";

            document.getElementById("resetPasswordForm").reset();

            // Redirect to login after successful reset
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2500);

        } catch (error) {

            console.error("Reset password error:", error);

            message.textContent = error.message;
            message.style.color = "#b42318";

        } finally {

            button.disabled = false;
            button.textContent = "Reset Password";

        }

    });
