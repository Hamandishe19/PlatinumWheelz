// Data (Loaded from data.js)

// Initialize default test users
function initializeTestUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if test user already exists
    const testUserExists = users.some(u => u.email === 'customer@example.com');
    
    if (!testUserExists) {
        const testUser = {
            name: 'John Doe',
            email: 'customer@example.com',
            password: 'password123',
            registeredDate: new Date().toISOString()
        };
        users.push(testUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Call initialization
initializeTestUsers();

// User Authentication
function handleLogin(email, password) {
    if (email && password.length >= 6) {
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            loginTime: new Date().toISOString()
        }));
        return true;
    }
    return false;
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    alert('You have been logged out.');
    location.reload();
}

function isUserLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('luxedrive_cart')) || [];

function saveCart() {
    localStorage.setItem('luxedrive_cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(carId) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        if (confirm('You must be logged in to add items to cart. Go to login page?')) {
            localStorage.setItem('intendedAction', JSON.stringify({ action: 'addToCart', carId: carId }));
            window.location.href = 'login.html';
        }
        return;
    }

    const car = cars.find(c => c.id === carId);
    if (!car) return;

    const exists = cart.find(item => item.id === carId);
    if (exists) {
        alert(`${car.make} ${car.model} is already in your cart!`);
    } else {
        cart.push({...car, cartId: Date.now()});
        saveCart();
        alert(`${car.make} ${car.model} added to your cart!`);
    }
}

function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    saveCart();
}

function updateCartCount() {
    const counts = document.querySelectorAll('.cart-count');
    counts.forEach(counter => {
        counter.textContent = cart.length;
        if (cart.length > 0) {
            counter.classList.remove('hidden');
        } else {
            counter.classList.add('hidden');
        }
    });
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(num);
}

// Test Drive & Requests
function requestTestDrive(carId) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        if (confirm('Please log in to request a test drive')) {
            window.location.href = 'login.html';
        }
        return;
    }
    const car = cars.find(c => c.id === carId);
    window.location.href = `contact.html?interest=${carId}&interest_name=${car.make} ${car.model}&type=testdrive`;
}

function getCarById(carId) {
    return cars.find(c => c.id === carId);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Auto-execute intended action if redirected from login
    const intendedAction = localStorage.getItem('intendedAction');
    if (intendedAction) {
        try {
            const action = JSON.parse(intendedAction);
            if (action.action === 'addToCart' && action.carId) {
                addToCart(action.carId);
            } else if (action.action === 'testdrive' && action.carId) {
                requestTestDrive(action.carId);
            }
            localStorage.removeItem('intendedAction');
        } catch (e) {
            console.error('Error executing intended action:', e);
        }
    }
});


// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-darker/95', 'shadow-lg');
        navbar.classList.remove('bg-transparent', 'border-transparent');
        navbar.classList.add('border-gray-800');
    } else {
        navbar.classList.add('bg-transparent', 'border-transparent');
        navbar.classList.remove('bg-darker/95', 'shadow-lg', 'border-gray-800');
    }
});

// Render Featured Cars
function renderFeaturedCars() {
    const container = document.getElementById('featured-cars-container');
    if (!container) return; // Only run on pages with this container

    const featuredCars = cars.filter(car => car.featured);
    container.innerHTML = featuredCars.map(car => `
        <div class="bg-dark rounded-xl overflow-hidden border border-gray-800 hover:border-primary transition-colors duration-300 group">
            <div class="h-64 overflow-hidden relative img-zoom-container">
                <img src="${car.image}" alt="${car.make} ${car.model}" class="w-full h-full object-cover">
                <div class="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Featured</div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-1">${car.year} ${car.make}</h3>
                        <h2 class="text-xl font-bold text-white font-heading">${car.model}</h2>
                    </div>
                    <div class="text-primary font-bold text-xl">${formatCurrency(car.price)}</div>
                </div>
                
                <div class="flex justify-between text-gray-400 text-sm mb-6 border-t border-gray-800 pt-4">
                    <div class="flex flex-col items-center">
                        <i class="fa-solid fa-road mb-1"></i>
                        <span>${car.mileage.toLocaleString()} km</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <i class="fa-solid fa-stopwatch mb-1"></i>
                        <span>${car.specs["0_60"]}s 0-100</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <i class="fa-solid fa-horse-head mb-1"></i>
                        <span>${car.specs.horsepower}</span>
                    </div>
                </div>
                
                <div class="flex flex-col gap-3">
                    <div class="flex gap-3">
                        <a href="car-details.html?id=${car.id}" class="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-center py-2 rounded-lg transition-colors text-sm font-semibold">View Details</a>
                        <button onclick="addToCart('${car.id}')" class="flex-1 bg-primary hover:bg-red-700 text-white text-center py-2 rounded-lg transition-colors text-sm font-semibold"><i class="fa-solid fa-cart-plus mr-2"></i>Add to Cart</button>
                    </div>
                    <button onclick="requestTestDrive('${car.id}')" class="w-full bg-transparent border border-gray-700 hover:bg-white hover:text-darker text-white text-center py-2 rounded-lg transition-colors text-sm font-semibold border-white/20"><i class="fa-solid fa-key mr-2"></i>Request Test Drive</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize on page load
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderFeaturedCars();

    // Auth UI Updates
    const currentUserStr = localStorage.getItem('currentUser');
    const userIcons = document.querySelectorAll('a[href="login.html"]');

    if (currentUserStr) {
        try {
            const user = JSON.parse(currentUserStr);
            const initials = user.name ? user.name.charAt(0).toUpperCase() : 'U';

            userIcons.forEach(icon => {
                icon.innerHTML = `<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">${initials}</div>`;
                icon.title = 'Sign Out';
                icon.href = '#';
                icon.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (confirm('Are you sure you want to sign out?')) {
                        localStorage.removeItem('currentUser');
                        window.location.reload();
                    }
                });
            });
        } catch (e) { }
    }
});
