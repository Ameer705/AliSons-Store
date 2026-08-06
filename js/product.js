/* ==========================================
   ALISONS STORE
   product.js
   Part 1
========================================== */

// Default Product ID
let currentProductId = 1;

// Get product from script.js
function getCurrentProduct() {
    return products.find(product => product.id === currentProductId);
}

// Load Product Information
function loadProduct() {

    const product = getCurrentProduct();

    if (!product) return;

    // Image
    const image = document.getElementById("product-image");
    if (image) {
        image.src = product.image;
        image.alt = product.name;
    }

    // Name
    const name = document.getElementById("product-name");
    if (name) {
        name.textContent = product.name;
    }

    // Category
    const category = document.getElementById("product-category");
    if (category) {
        category.textContent = product.category;
    }

    // Specification Category
    const specCategory = document.getElementById("spec-category");
    if (specCategory) {
        specCategory.textContent = product.category;
    }

    // Price
    const price = document.getElementById("product-price");
    if (price) {
        price.textContent = product.price.toFixed(2) + " SAR";
    }

    // Rating
    const rating = document.getElementById("product-rating");
    if (rating) {
        rating.textContent = product.rating + " Rating";
    }

    // Description
    const description = document.getElementById("product-description");

    if (description) {

        description.textContent =
            `${product.name} is one of our premium products designed to offer excellent quality and value. It is carefully selected to provide durability, reliability and customer satisfaction.`;

    }

}
/* ==========================================
   Part 2
   Cart + Wishlist + Quantity
========================================== */

// Get Selected Quantity

function getSelectedQuantity() {

    const quantityInput = document.getElementById("quantity");

    if (!quantityInput) return 1;

    let quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {

        quantity = 1;
        quantityInput.value = 1;

    }

    return quantity;

}

// Add Current Product To Cart

function addCurrentProductToCart() {

    const product = getCurrentProduct();

    if (!product) return;

    const quantity = getSelectedQuantity();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({

            ...product,
            quantity: quantity

        });

    }

    saveCart();

    alert(`${quantity} × ${product.name} added to cart.`);

}

// Add Current Product To Wishlist

function addCurrentProductToWishlist() {

    const product = getCurrentProduct();

    if (!product) return;

    const exists = wishlist.some(item => item.id === product.id);

    if (exists) {

        alert("This product is already in your wishlist.");

        return;

    }

    wishlist.push(product);

    saveWishlist();

    alert(`${product.name} added to wishlist.`);

}

// Button Events

const addCartButton = document.getElementById("add-cart-btn");

if (addCartButton) {

    addCartButton.addEventListener("click", addCurrentProductToCart);

}

const addWishlistButton = document.getElementById("add-wishlist-btn");

if (addWishlistButton) {

    addWishlistButton.addEventListener("click", addCurrentProductToWishlist);

}
/* ==========================================
   Part 3
   Related Products + Initialize
========================================== */

// Load Related Products

function loadRelatedProducts() {

    const container = document.getElementById("related-products");

    if (!container) return;

    const relatedProducts = products
        .filter(product => product.id !== currentProductId)
        .slice(0, 4);

    container.innerHTML = "";

    relatedProducts.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <span class="product-badge">${product.badge}</span>

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image">

            <div class="product-content">

                <p class="product-category">${product.category}</p>

                <h3>${product.name}</h3>

                <div class="product-rating">
                    ⭐ ${product.rating}
                </div>

                <div class="product-price">

                    <span class="new-price">
                        ${product.price.toFixed(2)} SAR
                    </span>

                </div>

                <div class="product-buttons">

                    <button
                        class="cart-btn"
                        onclick="addToCart(${product.id})">

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// Initialize Product Page

function initializeProductPage() {

    loadProduct();

    loadRelatedProducts();

    updateCounters();

}

// Run when page loads

document.addEventListener("DOMContentLoaded", () => {

    initializeProductPage();

});

// Make functions available globally

window.loadProduct = loadProduct;
window.loadRelatedProducts = loadRelatedProducts;
window.addCurrentProductToCart = addCurrentProductToCart;
window.addCurrentProductToWishlist = addCurrentProductToWishlist;