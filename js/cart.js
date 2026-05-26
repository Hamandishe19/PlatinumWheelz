const emptyCartEl = document.getElementById('empty-cart');
const cartContentEl = document.getElementById('cart-content');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');
const HANDLING_FEE = 2500;

document.addEventListener('DOMContentLoaded', () => {
    // Wait slightly to ensure main.js has loaded the cart variable
    setTimeout(renderCartPage, 100);
});

function removeFromCartPage(cartItemId) {
    cart = cart.filter(item => item.cartId !== cartItemId);
    saveCart();
    renderCartPage();
}

function processCheckout() {
    if (!isUserLoggedIn()) {
        if (confirm('You must be logged in to checkout. Go to login page?')) {
            window.location.href = 'login.html';
        }
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const subtotal = getCartTotal();
    const total = subtotal + HANDLING_FEE;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    // Create order
    const order = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        customer: user.email,
        items: cart.map(c => ({ id: c.id, make: c.make, model: c.model, price: c.price })),
        subtotal: subtotal,
        handling: HANDLING_FEE,
        total: total,
        date: new Date().toLocaleDateString(),
        status: 'Payment Pending'
    };

    // Save order
    let orders = JSON.parse(localStorage.getItem('userOrders')) || [];
    orders.push(order);
    localStorage.setItem('userOrders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    saveCart();

    alert(`✓ Order ${order.id} Created!\n\nTotal: ${formatCurrency(total)}\n\nOur team will contact you within 24 hours.\nThank you for your purchase!`);
    location.reload();
}

function renderCartPage() {
    if (!cart || cart.length === 0) {
        emptyCartEl.classList.remove('hidden');
        cartContentEl.classList.add('hidden');
        return;
    }

    emptyCartEl.classList.add('hidden');
    cartContentEl.classList.remove('hidden');

    // Calculate totals
    const subtotal = getCartTotal();
    const total = subtotal + HANDLING_FEE;

    cartSubtotalEl.textContent = formatCurrency(subtotal);
    cartTotalEl.textContent = formatCurrency(total);

    // Set financing calculator default amount
    const financeAmountEl = document.getElementById('finance-amount');
    if (financeAmountEl) {
        financeAmountEl.value = Math.round(total);
        updateFinancingCalc();
    }

    // Render items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="bg-dark rounded-xl border border-gray-800 overflow-hidden hover:border-primary transition-colors group flex">
            <div class="w-40 h-40 overflow-hidden shrink-0">
                <img src="${item.image}" alt="${item.make} ${item.model}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <h3 class="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">${item.year} ${item.make}</h3>
                    <h2 class="text-xl font-bold text-white font-heading mb-2">${item.model}</h2>
                    <p class="text-gray-400 text-sm">${item.category}</p>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <div class="text-primary font-bold text-2xl">${formatCurrency(item.price)}</div>
                    <button onclick="removeFromCartPage(${item.cartId})" class="px-4 py-2 bg-red-900/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-medium flex items-center gap-2">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Financing calculator functions
function toggleFinancingCalculator() {
    const calc = document.getElementById('financing-calculator');
    if (calc.classList.contains('hidden')) {
        calc.classList.remove('hidden');
        const amount = document.getElementById('finance-amount');
        if (amount.value === '0' || !amount.value) {
            amount.value = Math.round(getCartTotal() + HANDLING_FEE);
        }
        updateFinancingCalc();
    } else {
        calc.classList.add('hidden');
    }
}

function updateFinancingCalc() {
    const principal = parseFloat(document.getElementById('finance-amount').value) || 0;
    const months = parseInt(document.getElementById('finance-term').value) || 60;
    const annualRate = parseFloat(document.getElementById('finance-rate').value) || 4.99;
    
    if (principal <= 0) {
        document.getElementById('monthly-payment').textContent = '$0';
        document.getElementById('total-amount').textContent = '$0';
        return;
    }

    // Calculate monthly payment using amortization formula
    const monthlyRate = annualRate / 100 / 12;
    let monthlyPayment;
    
    if (monthlyRate === 0) {
        monthlyPayment = principal / months;
    } else {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
    }
    
    const totalAmount = monthlyPayment * months;
    
    document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
    document.getElementById('total-amount').textContent = formatCurrency(totalAmount);
}
