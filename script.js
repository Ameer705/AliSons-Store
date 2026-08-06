/* ==========================================
   ALISONS STORE
   script.js
   Part 1
========================================== */

// Product Database

const products = [

{
    id:1,
    name:"Teddy Bear",
    category:"Toys",
    price:45.95,
    oldPrice:59.95,
    rating:5,
    image:"images/teddy.jpg",
    badge:"Best Seller"
},

{
    id:2,
    name:"Wireless Headphones",
    category:"Electronics",
    price:149.99,
    oldPrice:199.99,
    rating:4.8,
    image:"images/headphones.jpg",
    badge:"Sale"
},

{
    id:3,
    name:"Travel Backpack",
    category:"Travel",
    price:89.99,
    oldPrice:119.99,
    rating:4.7,
    image:"images/backpack.jpg",
    badge:"New"
},

{
    id:4,
    name:"Smart Watch",
    category:"Electronics",
    price:249.99,
    oldPrice:299.99,
    rating:4.9,
    image:"images/watch.jpg",
    badge:"Hot"
},

{
    id:5,
    name:"Kids Toy Car",
    category:"Toys",
    price:39.99,
    oldPrice:55.00,
    rating:4.6,
    image:"images/toycar.jpg",
    badge:"Popular"
},

{
    id:6,
    name:"Men T-Shirt",
    category:"Fashion",
    price:59.99,
    oldPrice:79.99,
    rating:4.5,
    image:"images/shirt.jpg",
    badge:"New"
},

{
    id:7,
    name:"Laptop Bag",
    category:"Travel",
    price:79.99,
    oldPrice:99.99,
    rating:4.7,
    image:"images/laptopbag.jpg",
    badge:"Top Rated"
},

{
    id:8,
    name:"Bluetooth Speaker",
    category:"Electronics",
    price:119.99,
    oldPrice:159.99,
    rating:4.8,
    image:"images/speaker.jpg",
    badge:"Discount"
}

];

// Local Storage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Product Display Variables

let filteredProducts = [...products];

let currentPage = 1;

const productsPerPage = 6;

// DOM Elements

const productContainer = document.getElementById("products-container");

const cartCount = document.getElementById("cart-count");

const wishlistCount = document.getElementById("wishlist-count");

// Update Counters

function updateCounters(){

    if(cartCount){

        cartCount.textContent = cart.length;

    }

    if(wishlistCount){

        wishlistCount.textContent = wishlist.length;

    }

}

// Save Local Storage

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounters();

}

function saveWishlist(){

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateCounters();

}

// Run on Page Load

updateCounters();
/* ==========================================
   Part 2
   Product Display + Cart + Wishlist
========================================== */

// Display Products

function displayProducts(list = filteredProducts){

    if(!productContainer) return;

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;

    const pageProducts = list.slice(start, end);

    if(pageProducts.length === 0){

        productContainer.innerHTML = `
            <div class="no-products">
                <h2>No Products Found</h2>
                <p>Please try another search or category.</p>
            </div>
        `;

        return;
    }

    productContainer.innerHTML = "";

    pageProducts.forEach(product=>{

        productContainer.innerHTML += `

        <div class="product-card">

            <span class="product-badge">${product.badge}</span>

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image">

            <div class="product-content">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>${product.name}</h3>

                <div class="product-rating">

                    ⭐ ${product.rating}

                </div>

                <div class="product-price">

                    <span class="new-price">
                        ${product.price.toFixed(2)} SAR
                    </span>

                    <span class="old-price">
                        ${product.oldPrice.toFixed(2)} SAR
                    </span>

                </div>

                <div class="product-buttons">

                    <button
                        class="cart-btn"
                        onclick="addToCart(${product.id})">

                        Add To Cart

                    </button>

                    <button
                        class="wishlist-btn"
                        onclick="addToWishlist(${product.id})">

                        ❤

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// Add To Cart

function addToCart(id){

    const product = products.find(p=>p.id===id);

    if(!product) return;

    const existing = cart.find(item=>item.id===id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    saveCart();

    alert(product.name + " added to cart.");

}

// Wishlist

function addToWishlist(id){

    const product = products.find(p=>p.id===id);

    if(!product) return;

    const exists = wishlist.some(item=>item.id===id);

    if(exists){

        alert("Already in wishlist.");

        return;

    }

    wishlist.push(product);

    saveWishlist();

    alert(product.name + " added to wishlist.");

}

// First Display

displayProducts();
/* ==========================================
   Part 3
   Search + Filter + Sort
========================================== */

// Search Products

function searchProducts() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const keyword = searchInput.value.trim().toLowerCase();

    filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );

    currentPage = 1;

    displayProducts(filteredProducts);

}

// Category Filter

function filterProducts(category) {

    if (category === "All") {

        filteredProducts = [...products];

    } else {

        filteredProducts = products.filter(product =>
            product.category === category
        );

    }

    currentPage = 1;

    displayProducts(filteredProducts);

}

// Sort Products

const sortSelect = document.getElementById("sort-products");

if (sortSelect) {

    sortSelect.addEventListener("change", function () {

        switch (this.value) {

            case "price-low":
                filteredProducts.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                filteredProducts.sort((a, b) => b.price - a.price);
                break;

            case "name-asc":
                filteredProducts.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;

            case "name-desc":
                filteredProducts.sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
                break;

            default:
                filteredProducts = [...products];
        }

        currentPage = 1;

        displayProducts(filteredProducts);

    });

}

// Search Button

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", searchProducts);

}

// Live Search

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", searchProducts);

}
/* ==========================================
   Part 4
   Pagination + UI Features
========================================== */

// Update Pagination

function updatePagination() {

    const pageInfo = document.getElementById("page-info");
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");

    if (!pageInfo || !prevBtn || !nextBtn) return;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

}

// Previous Page

const prevBtn = document.getElementById("prev-page");

if (prevBtn) {

    prevBtn.addEventListener("click", () => {

        if (currentPage > 1) {

            currentPage--;

            displayProducts(filteredProducts);

            updatePagination();

            window.scrollTo({
                top: document.getElementById("products").offsetTop - 80,
                behavior: "smooth"
            });

        }

    });

}

// Next Page

const nextBtn = document.getElementById("next-page");

if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

        if (currentPage < totalPages) {

            currentPage++;

            displayProducts(filteredProducts);

            updatePagination();

            window.scrollTo({
                top: document.getElementById("products").offsetTop - 80,
                behavior: "smooth"
            });

        }

    });

}

// Back To Top

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 300) {

        backToTop.style.display = "flex";

    } else {

        backToTop.style.display = "none";

    }

});

// Newsletter

const subscribeBtn = document.getElementById("subscribeBtn");

if (subscribeBtn) {

    subscribeBtn.addEventListener("click", () => {

        const email = document
            .getElementById("newsletterEmail")
            .value
            .trim();

        if (email === "") {

            alert("Please enter your email.");

            return;

        }

        alert("Thank you for subscribing!");

        document.getElementById("newsletterEmail").value = "";

    });

}

// Initialize Pagination

updatePagination();
/* ==========================================
   Part 5
   Final Initialization
========================================== */

// Initialize Website

function initializeWebsite() {

    // Update counters
    updateCounters();

    // Reset filtered products
    filteredProducts = [...products];

    // Display first page
    displayProducts(filteredProducts);

    // Update pagination
    updatePagination();

    console.log("✅ AliSons Store initialized successfully.");

}

// Refresh Product View

function refreshProducts() {

    displayProducts(filteredProducts);

    updatePagination();

}

// Listen for Storage Changes (multiple tabs)

window.addEventListener("storage", () => {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    updateCounters();

});

// Run after page loads

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});

// Optional helper functions

function clearCart() {

    cart = [];

    saveCart();

    refreshProducts();

    alert("Cart cleared.");

}

function clearWishlist() {

    wishlist = [];

    saveWishlist();

    alert("Wishlist cleared.");

}

// Export (optional for future modules)

window.products = products;
window.cart = cart;
window.wishlist = wishlist;
window.addToCart = addToCart;
window.addToWishlist = addToWishlist;
window.filterProducts = filterProducts;
window.searchProducts = searchProducts;
window.refreshProducts = refreshProducts;
/* ==========================================
   USER MENU
========================================== */

const userBtn = document.getElementById("user-btn");
const userDropdown = document.getElementById("user-dropdown");
const userName = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");

// Get logged-in user
const loggedUser = JSON.parse(localStorage.getItem("currentUser"));

// Show user name
if (loggedUser) {

    if (userName) {
        userName.textContent =
            loggedUser.fullName || loggedUser.name || "User";
    }

    const dropdownName =
        document.getElementById("dropdown-user-name");

    const dropdownEmail =
        document.getElementById("dropdown-user-email");

    if (dropdownName) {
        dropdownName.textContent =
            loggedUser.fullName || loggedUser.name;
    }

    if (dropdownEmail) {
        dropdownEmail.textContent =
            loggedUser.email;
    }

}

// Toggle dropdown
if (userBtn) {
    userBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle("show");
    });
}

// Close dropdown when clicking outside
document.addEventListener("click", function () {
    if (userDropdown) {
        userDropdown.classList.remove("show");
    }
});

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();

        localStorage.removeItem("loggedInUser");

        alert("Logged out successfully!");

        window.location.href = "login/login.html";
    });
}