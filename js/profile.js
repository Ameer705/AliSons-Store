/* ==========================================
   AliSons Store Profile
========================================== */

const profileForm = document.getElementById("profile-form");

const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const profilePhone = document.getElementById("profile-phone");
const profilePassword = document.getElementById("profile-password");
const profileConfirmPassword = document.getElementById("profile-confirm-password");

const logoutBtn = document.getElementById("logout-btn");

/* Load Logged-in User */

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login/login.html";

}

profileName.value = currentUser.name || "";
profileEmail.value = currentUser.email || "";
profilePhone.value = currentUser.phone || "";
/* ==========================================
   Save Profile
========================================== */

profileForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = profileName.value.trim();
    const email = profileEmail.value.trim();
    const phone = profilePhone.value.trim();
    const password = profilePassword.value.trim();
    const confirm = profileConfirmPassword.value.trim();

    if (name === "" || email === "" || phone === "") {

        alert("Please fill all required fields.");

        return;

    }

    if (password !== "") {

        if (password !== confirm) {

            alert("Passwords do not match.");

            return;

        }

        currentUser.password = password;

    }

    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(user => {

    if (
        user.email === currentUser.email ||
        user.email === profileEmail.value.trim()
    ) {

        return currentUser;

    }

    return user;

});

localStorage.setItem(
    "users",
    JSON.stringify(users)
);

alert("Profile updated successfully!");

profilePassword.value = "";
profileConfirmPassword.value = "";

});
/* ==========================================
   Logout
========================================== */

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {
            return;
        }

        localStorage.removeItem("currentUser");

        alert("Logged out successfully.");

        window.location.href = "login/login.html";

    });

}