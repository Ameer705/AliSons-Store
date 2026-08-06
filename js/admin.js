/* ====================================
   AliSons Store Admin Login
==================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("adminLoginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Demo Admin Credentials
        const adminEmail = "admin@alisons.sa";
        const adminPassword = "AliSons123";

        if (email === adminEmail && password === adminPassword) {

            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminEmail", email);

            alert("Welcome to AliSons Store Admin Dashboard!");

            window.location.href = "./dashboard.html";

        } else {

            alert("Invalid email or password.");

        }

    });

});
/* ====================================
   Add Product Form
==================================== */

const addProductForm = document.getElementById("addProductForm");

if(addProductForm){

addProductForm.addEventListener("submit",function(e){

e.preventDefault();

alert("Product saved successfully!");

// Future:
// Here we'll save the product to the database.

addProductForm.reset();

});

}
/* ====================================
   Customer Search (Demo)
==================================== */

const customerSearch = document.getElementById("customerSearch");

if(customerSearch){

customerSearch.addEventListener("keyup", function(){

console.log("Searching:", this.value);

});

}
/* ====================================
   Reports Export (Demo)
==================================== */

document.querySelectorAll(".login-btn").forEach(button => {

button.addEventListener("click", function(){

if(this.textContent.includes("Export")){

alert("Export feature will be available after database integration.");

}

});

});
/* ====================================
   Store Settings (Demo)
==================================== */

const settingsForm = document.getElementById("settingsForm");

if(settingsForm){

settingsForm.addEventListener("submit",function(e){

e.preventDefault();

alert("Settings saved successfully!");

// Future:
// Save settings to database here.

});

}