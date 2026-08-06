/* ==========================================
   ALISONS STORE
   checkout.js
   Part 1
========================================== */

// DOM Elements

const checkoutItems = document.getElementById("checkout-items");
const checkoutItemCount = document.getElementById("checkout-item-count");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutTotal = document.getElementById("checkout-total");

// Load Cart From Local Storage

cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Checkout Items

function displayCheckoutItems() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <p>Your cart is empty.</p>

        `;

        if (checkoutItemCount) checkoutItemCount.textContent = "0";

        if (checkoutSubtotal) checkoutSubtotal.textContent = "0.00 SAR";

        if (checkoutTotal) checkoutTotal.textContent = "0.00 SAR";

        return;

    }

    let totalItems = 0;

    let subtotal = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        totalItems += item.quantity;

        subtotal += itemTotal;

        checkoutItems.innerHTML += `

        <div class="summary-row">

            <span>

                ${item.name}

                × ${item.quantity}

            </span>

            <span>

                ${itemTotal.toFixed(2)} SAR

            </span>

        </div>

        `;

    });

    checkoutItemCount.textContent = totalItems;

    checkoutSubtotal.textContent = subtotal.toFixed(2) + " SAR";

    checkoutTotal.textContent = subtotal.toFixed(2) + " SAR";

}

// Update Counters

updateCounters();

// Load Summary

displayCheckoutItems();
/* ==========================================
   Part 2
   Place Order
========================================== */

const checkoutForm = document.getElementById("checkout-form");

function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();

    if (
        !fullName ||
        !email ||
        !phone ||
        !address ||
        !city
    ) {

        alert("Please complete all required fields.");

        return;

    }

    const paymentMethod =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;

    const order = {

        customer: fullName,

        email,

        phone,

        address,

        city,

        payment: paymentMethod,

        items: cart,

        total: checkoutTotal.textContent,

        date: new Date().toLocaleString()

    };

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );

    alert(

`✅ Thank you ${fullName}!

Your order has been placed successfully.

Payment:
${paymentMethod}

Thank you for shopping with AliSons Store.`

    );

    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounters();

    window.location.href = "index.html";

}

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        placeOrder
    );

}
/* ==========================================
   Part 3
   Initialize Checkout Page
========================================== */

function initializeCheckoutPage() {

    // Load latest cart
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Update header counters
    updateCounters();

    // Display checkout summary
    displayCheckoutItems();

    // If cart is empty, disable checkout
    if (cart.length === 0) {

        const button = document.getElementById("place-order-btn");

        if (button) {

            button.disabled = true;
            button.textContent = "Cart is Empty";

        }

    }

}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {

    initializeCheckoutPage();

});

// Keep checkout updated if Local Storage changes
window.addEventListener("storage", () => {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    displayCheckoutItems();

    updateCounters();

});

// Export functions (optional)
window.displayCheckoutItems = displayCheckoutItems;
window.placeOrder = placeOrder;