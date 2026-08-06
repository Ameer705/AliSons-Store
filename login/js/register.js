/* ==========================================
   AliSons Store Register
========================================== */

const registerForm = document.getElementById("register-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const togglePassword = document.getElementById("toggle-password");
const toggleConfirmPassword = document.getElementById("toggle-confirm-password");

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

/* Show / Hide Confirm Password */

if (toggleConfirmPassword) {

    toggleConfirmPassword.addEventListener("click", () => {

        if (confirmPasswordInput.type === "password") {

            confirmPasswordInput.type = "text";

            toggleConfirmPassword.innerHTML =
                '<i class="fas fa-eye-slash"></i>';

        } else {

            confirmPasswordInput.type = "password";

            toggleConfirmPassword.innerHTML =
                '<i class="fas fa-eye"></i>';

        }

    });

}
/* ==========================================
   Register New User
========================================== */

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        /* Check Password Match */

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        /* Get Existing Users */

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        /* Check Email */

        const exists = users.find(user => user.email === email);

        if (exists) {

            alert("This email is already registered.");

            return;

        }

        /* Create User */

        const newUser = {

            id: Date.now(),

            name,

            email,

            phone,

            password

        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Account created successfully!");

        window.location.href = "../login/login.html";

    });

}
/* ==========================================
   Auto Focus
========================================== */

window.addEventListener("DOMContentLoaded", () => {

    if (nameInput) {

        nameInput.focus();

    }

});