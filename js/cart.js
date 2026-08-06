/* ==========================================
   ALISONS STORE
   cart.js
   Part 1
========================================== */

// DOM Elements
const cartItemsContainer = document.getElementById("cart-items");
const cartCountSummary = document.getElementById("cart-count-summary");
const subtotalElement = document.getElementById("subtotal");
const grandTotalElement = document.getElementById("grand-total");
const emptyCartMessage = document.getElementById("empty-cart-message");

// Display Cart
function displayCart() {

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        if (emptyCartMessage) {
            emptyCartMessage.style.display = "block";
        }

        updateSummary();

        return;
    }

    if (emptyCartMessage) {
        emptyCartMessage.style.display = "none";
    }

    cart.forEach(item => {

        const price = Number(item.price);
const total = price * item.quantity;

        cartItemsContainer.innerHTML += `

<tr>

    <td>

        <div style="display:flex;align-items:center;gap:10px;">

            <img
                src="${item.image}"
                alt="${item.name}"
                width="70"
                height="70"
                style="object-fit:cover;border-radius:8px;">

            <div>

                <strong>${item.name}</strong>

                <br>

                <small>${item.category}</small>

            </div>

        </div>

    </td>

    <td>${price.toFixed(2)} SAR</td>

    <td>

        <button onclick="changeQuantity(${item.id},-1)">−</button>

        <strong style="padding:0 10px;">
            ${item.quantity}
        </strong>

        <button onclick="changeQuantity(${item.id},1)">+</button>

    </td>

    <td>${total.toFixed(2)} SAR</td>

    <td>

        <button
            onclick="removeItem(${item.id})">

            ❌

        </button>

    </td>

</tr>

`;

    });

    updateSummary();

}

// Update Summary
function updateSummary() {

    let totalItems = 0;
    let subtotal = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

        const price = Number(item.price);
        subtotal += price * item.quantity;

    });

    if (cartCountSummary) {
        cartCountSummary.textContent = totalItems;
    }

    if (subtotalElement) {
        subtotalElement.textContent =
            subtotal.toFixed(2) + " SAR";
    }

    if (grandTotalElement) {
        grandTotalElement.textContent =
            subtotal.toFixed(2) + " SAR";
    }

    updateCounters();

}
/* ==========================================
   Part 2
   Quantity + Remove + Clear Cart
========================================== */

// Change Quantity

function changeQuantity(productId, change) {

    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        removeItem(productId);

        return;

    }

    saveCart();

    displayCart();

}

// Remove One Item

function removeItem(productId) {

    cart = cart.filter(product => product.id !== productId);

    saveCart();

    displayCart();

}

// Clear Cart

function clearCart() {

    const confirmClear = confirm(
        "Are you sure you want to clear your cart?"
    );

    if (!confirmClear) return;

    cart = [];

    saveCart();

    displayCart();

}

// Clear Cart Button

const clearCartButton = document.getElementById("clear-cart-btn");

if (clearCartButton) {

    clearCartButton.addEventListener("click", clearCart);

}

// Save Cart Override

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounters();

}

// Refresh Cart

function refreshCart() {

    displayCart();

    updateCounters();

}
/* ==========================================
   Part 3
   Initialize Cart Page
========================================== */

// Initialize Cart Page

function initializeCartPage() {

    // Load latest cart from Local Storage
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Update counters
    updateCounters();

    // Display cart items
    displayCart();

}

// Listen for changes from other tabs/windows

window.addEventListener("storage", () => {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    displayCart();

});

// Start page

document.addEventListener("DOMContentLoaded", () => {

    initializeCartPage();

});

// Make functions available globally

window.changeQuantity = changeQuantity;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.displayCart = displayCart;
window.updateSummary = updateSummary;