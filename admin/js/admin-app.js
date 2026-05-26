// =====================================
// ADMIN DASHBOARD & DATA MANAGEMENT
// =====================================

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    initDashboardCards();
    initRecentOrders();
    loadAdminData();
});

// Load admin persistent data
function loadAdminData() {
    const savedData = localStorage.getItem('adminData');
    if (!savedData) {
        localStorage.setItem('adminData', JSON.stringify({
            users: usersData,
            orders: mockOrders,
            products: mockProducts,
            supportTickets: mockSupport
        }));
    }
}

// Get admin data from localStorage or mock data
function getAdminData() {
    const savedData = localStorage.getItem('adminData');
    if (savedData) {
        return JSON.parse(savedData);
    }
    return { users: usersData, orders: mockOrders, products: mockProducts, supportTickets: mockSupport };
}

// Save admin data to localStorage
function saveAdminData(data) {
    localStorage.setItem('adminData', JSON.stringify(data));
}

// =====================================
// DASHBOARD INITIALIZATION
// =====================================

// Initialize Chart.js Graphs
function initCharts() {
    // 1. Revenue Chart (Line)
    const ctxRevenue = document.getElementById('revenueChart');
    if (ctxRevenue) {
        new Chart(ctxRevenue, {
            type: 'line',
            data: {
                labels: dashboardData.revenue.labels,
                datasets: [{
                    label: 'Revenue ($)',
                    data: dashboardData.revenue.monthly,
                    borderColor: '#E63946',
                    backgroundColor: 'rgba(230, 57, 70, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#111827',
                    pointBorderColor: '#E63946',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleColor: '#f3f4f6',
                        bodyColor: '#9ca3af',
                        borderColor: '#374151',
                        borderWidth: 1,
                        padding: 10,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false, drawBorder: false },
                        ticks: { color: '#6b7280', font: { family: "'Inter', sans-serif", size: 11 } }
                    },
                    y: {
                        grid: { color: 'rgba(55, 65, 81, 0.3)', drawBorder: false },
                        ticks: {
                            color: '#6b7280',
                            font: { family: "'Inter', sans-serif", size: 11 },
                            callback: function (value) {
                                return '$' + (value / 1000) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }

    // 2. Category Sales Chart (Doughnut)
    const ctxCategory = document.getElementById('categoryChart');
    if (ctxCategory) {
        new Chart(ctxCategory, {
            type: 'doughnut',
            data: {
                labels: dashboardData.categories.labels,
                datasets: [{
                    data: dashboardData.categories.data,
                    backgroundColor: dashboardData.categories.colors,
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleColor: '#f3f4f6',
                        bodyColor: '#9ca3af',
                        borderColor: '#374151',
                        borderWidth: 1,
                        callbacks: {
                            label: function (context) {
                                return ` ${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize Dashboard Cards with real data
function initDashboardCards() {
    const data = getAdminData();
    
    // Total Revenue
    const totalRevenue = dashboardData.revenue.monthly.reduce((a, b) => a + b, 0);
    const revenuCard = document.querySelector('[data-metric="revenue"]');
    if (revenuCard) {
        revenuCard.querySelector('.stat-value').textContent = fmtCurr(totalRevenue);
    }

    // Total Orders
    const totalOrders = data.orders.length;
    const ordersCard = document.querySelector('[data-metric="orders"]');
    if (ordersCard) {
        ordersCard.querySelector('.stat-value').textContent = totalOrders;
    }

    // Active Users
    const activeUsers = data.users.filter(u => u.status === 'Active').length;
    const usersCard = document.querySelector('[data-metric="users"]');
    if (usersCard) {
        usersCard.querySelector('.stat-value').textContent = activeUsers;
    }

    // Vehicles in Stock
    const totalStock = data.products.reduce((sum, p) => sum + p.stock, 0);
    const vehiclesCard = document.querySelector('[data-metric="vehicles"]');
    if (vehiclesCard) {
        vehiclesCard.querySelector('.stat-value').textContent = totalStock;
    }
}

// Initialize Recent Orders Table
function initRecentOrders() {
    const data = getAdminData();
    const ordersTable = document.getElementById('recent-orders-body');
    if (!ordersTable) return;

    ordersTable.innerHTML = data.orders.slice(0, 4).map(order => {
        let statusBadge = '';
        if (order.status === 'Processing') statusBadge = '<span class="badge badge-warning">Processing</span>';
        else if (order.status === 'Completed') statusBadge = '<span class="badge badge-success">Completed</span>';
        else statusBadge = '<span class="badge badge-danger">Cancelled</span>';

        return `
            <tr>
                <td class="font-mono text-sm text-primary font-bold">${order.id}</td>
                <td>${order.customer}</td>
                <td class="text-gray-400">${order.vehicle}</td>
                <td class="font-medium">${fmtCurr(order.total)}</td>
                <td>${statusBadge}</td>
            </tr>
        `;
    }).join('');
}

// =====================================
// SIDEBAR & NAVIGATION
// =====================================

function toggleAdminSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function handleAdminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminAuth');
        window.location.href = 'login.html';
    }
}

// Update active sidebar link
window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// =====================================
// PRODUCTS/INVENTORY PAGE
// =====================================

function renderProductsTable() {
    const tableBody = document.getElementById('products-table-body');
    if (!tableBody) return;

    const data = getAdminData();
    tableBody.innerHTML = data.products.map((prod, idx) => {
        let statusBadge = '';
        if (prod.stock > 2) statusBadge = '<span class="badge badge-success">In Stock</span>';
        else if (prod.stock > 0) statusBadge = '<span class="badge badge-warning">Low Stock</span>';
        else statusBadge = '<span class="badge badge-danger">Out of Stock</span>';

        return `
            <tr>
                <td class="font-mono text-gray-400">${prod.id}</td>
                <td class="font-bold text-white">${prod.model}</td>
                <td class="text-gray-300">${prod.make}</td>
                <td class="font-medium text-white">${fmtCurr(prod.price)}</td>
                <td class="text-gray-400">${prod.stock} Units</td>
                <td>${statusBadge}</td>
                <td class="text-right">
                    <div class="flex items-center justify-end gap-2">
                        <button onclick="openEditProductModal(${idx})" class="w-8 h-8 rounded bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="duplicateProduct(${idx})" class="w-8 h-8 rounded bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition" title="Duplicate"><i class="fa-solid fa-copy"></i></button>
                        <button onclick="deleteProduct(${idx})" class="w-8 h-8 rounded bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function openEditProductModal(index) {
    const data = getAdminData();
    const product = data.products[index];
    document.getElementById('editVehicleIndex').value = index;
    document.getElementById('editVehicleMake').value = product.make;
    document.getElementById('editVehicleModel').value = product.model;
    document.getElementById('editVehiclePrice').value = product.price;
    document.getElementById('editVehicleStock').value = product.stock;
    document.getElementById('editVehicleModal').classList.remove('hidden');
}

function closeEditProductModal() {
    const modal = document.getElementById('editVehicleModal');
    if (modal) modal.classList.add('hidden');
}

function deleteProduct(index) {
    const data = getAdminData();
    const product = data.products[index];
    if (confirm(`Delete ${product.make} ${product.model}?`)) {
        data.products.splice(index, 1);
        saveAdminData(data);
        renderProductsTable();
        alert('Vehicle deleted successfully!');
    }
}

function duplicateProduct(index) {
    const data = getAdminData();
    const original = data.products[index];
    const newId = 'car_' + (data.products.length + 1);
    const duplicate = { ...original, id: newId, stock: 1 };
    data.products.push(duplicate);
    saveAdminData(data);
    renderProductsTable();
    alert(`${original.make} ${original.model} duplicated!`);
}

// =====================================
// ORDERS PAGE
// =====================================

function renderOrdersTable() {
    const tableBody = document.getElementById('orders-table-body');
    if (!tableBody) return;

    const data = getAdminData();
    tableBody.innerHTML = data.orders.map((order, idx) => {
        let statusBadge = '';
        if (order.status === 'Completed') statusBadge = '<span class="badge badge-success">Completed</span>';
        else if (order.status === 'Processing') statusBadge = '<span class="badge badge-warning">Processing</span>';
        else statusBadge = '<span class="badge badge-danger">Cancelled</span>';

        return `
            <tr>
                <td class="font-mono text-gray-400 font-bold cursor-pointer hover:text-primary" onclick="openOrderModal(${idx})">${order.id}</td>
                <td class="text-gray-400">${order.date}</td>
                <td>
                    <div class="font-bold text-white">${order.customer}</div>
                </td>
                <td class="text-gray-300">${order.vehicle}</td>
                <td class="font-medium text-white">${fmtCurr(order.total)}</td>
                <td>
                    <select class="bg-transparent border border-gray-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-primary status-select" data-id="${order.id}">
                        <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                        <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td class="text-right">
                    <div class="flex items-center justify-end gap-2">
                        <button class="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:text-white hover:bg-gray-700 transition" onclick="openOrderModal(${idx})" title="View Details"><i class="fa-solid fa-eye"></i></button>
                        <button class="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:text-white hover:bg-gray-700 transition print-invoice" data-id="${order.id}" title="Print Invoice"><i class="fa-solid fa-print"></i></button>
                        <button class="px-3 py-1 bg-primary text-white rounded hover:bg-red-700 transition process-order" data-id="${order.id}">Process</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Attach event listeners
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const orderId = e.target.dataset.id;
            const data = getAdminData();
            const order = data.orders.find(o => o.id === orderId);
            if (order) {
                order.status = e.target.value;
                saveAdminData(data);
            }
        });
    });

    document.querySelectorAll('.process-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.dataset.id;
            const data = getAdminData();
            const order = data.orders.find(o => o.id === orderId);
            if (order) {
                if (order.status === 'Processing') {
                    order.status = 'Completed';
                    saveAdminData(data);
                    alert(`Order ${orderId} marked as completed!`);
                } else {
                    alert(`Order ${orderId} is already ${order.status.toLowerCase()}.`);
                }
                renderOrdersTable();
            }
        });
    });

    document.querySelectorAll('.print-invoice').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.dataset.id;
            alert(`Printing invoice for order ${orderId}...\n\nIn production, this would generate a PDF.`);
        });
    });
}

function openOrderModal(index) {
    const data = getAdminData();
    const order = data.orders[index];
    document.getElementById('modalOrderId').textContent = order.id;
    document.getElementById('modalCustomer').textContent = order.customer;
    document.getElementById('modalVehicle').textContent = order.vehicle;
    document.getElementById('modalDate').textContent = order.date;
    document.getElementById('modalTotal').textContent = fmtCurr(order.total);
    document.getElementById('modalStatus').textContent = order.status;
    document.getElementById('orderDetailsModal').classList.remove('hidden');
}

function closeOrderModal() {
    const modal = document.getElementById('orderDetailsModal');
    if (modal) modal.classList.add('hidden');
}

// =====================================
// SUPPORT PAGE
// =====================================

function renderSupportTickets() {
    const ticketList = document.getElementById('ticket-list');
    if (!ticketList) return;

    const data = getAdminData();
    ticketList.innerHTML = data.supportTickets.map((ticket, index) => {
        const isActive = index === 0 ? 'bg-gray-800/50 border-l-4 border-l-primary' : 'border-b border-gray-800 hover:bg-gray-800/30';
        let pBadge = '';
        if (ticket.priority === 'High') pBadge = '<span class="w-2 h-2 rounded-full bg-red-500"></span>';
        else if (ticket.priority === 'Medium') pBadge = '<span class="w-2 h-2 rounded-full bg-yellow-500"></span>';
        else pBadge = '<span class="w-2 h-2 rounded-full bg-blue-500"></span>';

        return `
            <div class="p-4 cursor-pointer transition-colors ${isActive}" onclick="selectSupportTicket('${ticket.id}')">
                <div class="flex justify-between items-start mb-1">
                    <h4 class="font-bold text-sm text-white truncate pr-2">${ticket.subject}</h4>
                    ${pBadge}
                </div>
                <p class="text-xs text-gray-400 mb-2">${ticket.customer} • ${ticket.date}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xs font-mono text-gray-500">${ticket.id}</span>
                    <span class="text-[10px] font-bold uppercase tracking-wider ${ticket.status === 'Open' ? 'text-green-500' : 'text-gray-500'}">${ticket.status}</span>
                </div>
            </div>
        `;
    }).join('');
}

function selectSupportTicket(ticketId) {
    const data = getAdminData();
    const ticket = data.supportTickets.find(t => t.id === ticketId);
    if (ticket) {
        document.querySelector('h2').textContent = ticket.subject;
        const badgeEl = document.querySelector('.badge-warning');
        if (badgeEl) badgeEl.textContent = ticket.priority + ' Priority';
        const detailEl = document.querySelector('p.text-gray-400');
        if (detailEl) detailEl.innerHTML = `Ticket #${ticket.id} • <span class="font-medium text-gray-300">${ticket.customer}</span> • ${ticket.date}`;
    }
}

// =====================================
// FINANCE PAGE
// =====================================

function renderFinanceTable() {
    const tableBody = document.getElementById('finance-table-body');
    if (!tableBody) return;

    const data = getAdminData();
    tableBody.innerHTML = data.orders.map(order => {
        let statusBadge = '';
        if (order.status === 'Completed') statusBadge = '<span class="badge badge-success">Succeeded</span>';
        else if (order.status === 'Processing') statusBadge = '<span class="badge badge-warning">Pending</span>';
        else statusBadge = '<span class="badge badge-danger">Refunded</span>';

        const trxId = 'TRX-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const gateway = Math.random() > 0.3 ? 'Stripe' : 'EcoCash';

        return `
            <tr>
                <td class="font-mono text-gray-400">${trxId}</td>
                <td class="text-gray-400">${order.date}</td>
                <td class="font-medium text-white">${order.customer}</td>
                <td class="font-bold text-white">${fmtCurr(order.total)}</td>
                <td class="text-gray-400">${gateway}</td>
                <td>${statusBadge}</td>
                <td class="text-right">
                    <button class="px-3 py-1 text-xs text-gray-400 hover:text-primary transition"><i class="fa-solid fa-ellipsis"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

// =====================================
// INITIALIZATION FOR SPECIFIC PAGES
// =====================================

// Initialize products page
if (window.location.pathname.includes('products.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderProductsTable();
        const addBtn = document.getElementById('addVehicleBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                document.getElementById('addVehicleModal').classList.remove('hidden');
            });
        }

        const addForm = document.getElementById('addVehicleForm');
        if (addForm) {
            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const make = document.getElementById('vehicleMake').value.trim();
                const model = document.getElementById('vehicleModel').value.trim();
                const price = parseFloat(document.getElementById('vehiclePrice').value);
                const stock = parseInt(document.getElementById('vehicleStock').value);

                if (!make || !model || isNaN(price) || isNaN(stock)) {
                    alert('Please fill in all fields with valid data');
                    return;
                }

                const data = getAdminData();
                const newId = 'car_' + (data.products.length + 1);
                data.products.push({
                    id: newId,
                    model: model,
                    make: make,
                    price: price,
                    stock: stock,
                    status: stock > 2 ? 'In Stock' : (stock > 0 ? 'Low Stock' : 'Out of Stock')
                });

                saveAdminData(data);
                renderProductsTable();
                document.getElementById('addVehicleModal').classList.add('hidden');
                e.target.reset();
                alert(`Vehicle "${make} ${model}" added successfully!`);
            });
        }

        const editForm = document.getElementById('editVehicleForm');
        if (editForm) {
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const index = parseInt(document.getElementById('editVehicleIndex').value);
                const data = getAdminData();
                data.products[index].make = document.getElementById('editVehicleMake').value;
                data.products[index].model = document.getElementById('editVehicleModel').value;
                data.products[index].price = parseFloat(document.getElementById('editVehiclePrice').value);
                data.products[index].stock = parseInt(document.getElementById('editVehicleStock').value);
                data.products[index].status = data.products[index].stock > 2 ? 'In Stock' : (data.products[index].stock > 0 ? 'Low Stock' : 'Out of Stock');
                saveAdminData(data);
                renderProductsTable();
                closeEditProductModal();
                alert('Vehicle updated successfully!');
            });
        }
    });
}

// Initialize orders page
if (window.location.pathname.includes('orders.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderOrdersTable();
        const modal = document.getElementById('orderDetailsModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeOrderModal();
            });
        }
    });
}

// Initialize support page
if (window.location.pathname.includes('support.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderSupportTickets();
        const data = getAdminData();
        if (data.supportTickets.length > 0) {
            selectSupportTicket(data.supportTickets[0].id);
        }
    });
}

// Initialize finance page
if (window.location.pathname.includes('finance.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderFinanceTable();
    });
}
