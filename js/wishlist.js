/* ==========================================
   AliSons Store
   wishlist.js
   Part 1
========================================== */

// DOM Elements
const wishlistItems = document.getElementById("wishlist-items");
const wishlistEmpty = document.getElementById("wishlist-empty");
const wishlistSummaryCount = document.getElementById("wishlist-count-summary");
const wishlistTotal = document.getElementById("wishlist-total");
const clearWishlistBtn = document.getElementById("clear-wishlist-btn");

// Load Wishlist From Local Storage
function getWishlist() {

    return JSON.parse(localStorage.getItem("wishlist")) || [];

}

// Display Wishlist
function displayWishlist() {

    if (!wishlistItems) return;

    const wishlist = getWishlist();

    wishlistItems.innerHTML = "";

    let totalPrice = 0;

    if (wishlist.length === 0) {

        if (wishlistEmpty)
            wishlistEmpty.style.display = "block";

        document.querySelector(".cart-table").style.display = "none";

        if (wishlistSummaryCount)
            wishlistCount.textContent = "0";

        if (wishlistTotal)
            wishlistTotal.textContent = "0.00 SAR";

        return;

    }

    if (wishlistEmpty)
        wishlistEmpty.style.display = "none";

    document.querySelector(".cart-table").style.display = "table";

    wishlist.forEach((product, index) => {

        totalPrice += Number(product.price);

        wishlistItems.innerHTML += `

<tr>

<td>

<div style="display:flex;align-items:center;gap:15px;">

<img
src="${product.image}"
alt="${product.name}"
width="70"
height="70"
style="border-radius:8px;object-fit:cover;">

<div>

<strong>${product.name}</strong>

<br>

<small>${product.category}</small>

</div>

</div>

</td>

<td>

${Number(product.price).toFixed(2)} SAR

</td>

<td>

<button
class="move-cart-btn"
onclick="moveWishlistToCart(${index})">

Move To Cart

</button>

<button
class="remove-btn"
onclick="removeWishlistItem(${index})">

Remove

</button>

</td>

</tr>

`;

    });

    wishlistSummaryCount.textContent = wishlist.length;

    wishlistTotal.textContent = totalPrice.toFixed(2) + " SAR";

}
/* ==========================================
   Part 2
   Remove + Move To Cart
========================================== */

// Remove Item
function removeWishlistItem(index) {

    let wishlist = getWishlist();

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    if (typeof updateCounters === "function") {
        updateCounters();
    }

    displayWishlist();

}

// Move Item To Cart
function moveWishlistToCart(index) {

    let wishlist = getWishlist();

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    const product = wishlist[index];

    if (!product) return;

    const existing = cart.find(
        item => item.id === product.id
    );

    if (existing) {

        existing.quantity = (existing.quantity || 1) + 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    if (typeof updateCounters === "function") {
        updateCounters();
    }

    displayWishlist();

    alert(product.name + " moved to cart.");

}

// Update Summary
function updateWishlistSummary() {

    const wishlist = getWishlist();

    let total = 0;

    wishlist.forEach(item => {

        total += Number(item.price);

    });

    if (wishlistSummaryCount) {
        wishlistSummaryCount.textContent = wishlist.length;
    }

    if (wishlistTotal) {
        wishlistTotal.textContent = total.toFixed(2) + " SAR";
    }

}
/* ==========================================
   Part 3
   Clear Wishlist + Initialize
========================================== */

// Clear Wishlist
if (clearWishlistBtn) {

    clearWishlistBtn.addEventListener("click", function () {

        const confirmClear = confirm(
            "Are you sure you want to clear your wishlist?"
        );

        if (!confirmClear) return;

        localStorage.setItem(
            "wishlist",
            JSON.stringify([])
        );

        if (typeof updateCounters === "function") {
            updateCounters();
        }

        displayWishlist();

    });

}

// Refresh if Local Storage changes
window.addEventListener("storage", function () {

    displayWishlist();

});

// Initialize Page
document.addEventListener("DOMContentLoaded", function () {

    displayWishlist();

    updateWishlistSummary();

    if (typeof updateCounters === "function") {
        updateCounters();
    }

});

// Make Functions Global
window.displayWishlist = displayWishlist;
window.removeWishlistItem = removeWishlistItem;
window.moveWishlistToCart = moveWishlistToCart;
window.updateWishlistSummary = updateWishlistSummary;