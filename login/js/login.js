/* ==========================================
   AliSons Store Login
========================================== */

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");
const rememberMe = document.getElementById("remember");

/* Show / Hide Password */

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.innerHTML =
                '<i class="fas fa-eye-slash"></i>';

        } else {

            passwordInput.type = "password";

            togglePassword.innerHTML =
                '<i class="fas fa-eye"></i>';

        }

    });

}
/* Login */

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u =>
            u.email === email &&
            u.password === password
        );

        if (!user) {

            alert("Invalid email or password.");

            return;

        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        if (rememberMe.checked) {

            localStorage.setItem(
                "rememberEmail",
                email
            );

        } else {

            localStorage.removeItem(
                "rememberEmail"
            );

        }

        alert("Welcome " + user.name + "!");

        window.location.href = "../index.html";

    });

}
/* Remember Email */

window.addEventListener("DOMContentLoaded", () => {

    const remembered =
        localStorage.getItem("rememberEmail");

    if (remembered) {

        emailInput.value = remembered;

        rememberMe.checked = true;

    }

});