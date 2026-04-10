// ==================== USER DATA ====================
const users = [
    { email: 'admin@gmail.com', password: 'admin123', role: 'admin', name: 'Admin User' },
    { email: 'staff@gmail.com', password: 'staff123', role: 'staff', name: 'Staff User' },
    { email: 'customer@gmail.com', password: 'customer123', role: 'customer', name: 'Customer User' }
];

let currentUser = null;

// ==================== PAGE NAVIGATION ====================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// ==================== AUTHENTICATION ====================
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        errorDiv.classList.add('hidden');

        if (user.role === 'admin') {
            showPage('admin-dashboard');
        } else if (user.role === 'staff') {
            showPage('staff-dashboard');
        } else {
            document.getElementById('customer-name').textContent = user.name;
            showPage('customer-dashboard');
        }

        showToast(`Welcome back, ${user.name}!`);
    } else {
        errorDiv.textContent = 'Invalid email or password. Please try again.';
        errorDiv.classList.remove('hidden');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;

    showToast('Account created successfully! Please login.');
    showPage('login-page');
}

function logout() {
    currentUser = null;
    showPage('landing-page');
    showToast('You have been logged out.');
}

// ==================== CUSTOMER DASHBOARD ====================
function showCustomerSection(section) {
    document.querySelectorAll('.customer-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`customer-${section}-section`).classList.remove('hidden');

    document.querySelectorAll('#customer-dashboard .sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.sidebar-link').classList.add('active');
}

// ==================== STAFF DASHBOARD ====================
function showStaffSection(section) {
    document.querySelectorAll('.staff-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`staff-${section}-section`).classList.remove('hidden');

    document.querySelectorAll('#staff-dashboard .sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.sidebar-link').classList.add('active');
}

// ==================== ADMIN DASHBOARD ====================
function showAdminSection(section) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`admin-${section}-section`).classList.remove('hidden');

    document.querySelectorAll('#admin-dashboard .sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.sidebar-link').classList.add('active');
}

// ==================== BOOKING FUNCTIONS ====================
function calculateTotal() {
    const service = document.getElementById('service-type').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0;

    let price = 0;
    if (service === 'wash-fold') price = 50;
    else if (service === 'dry-cleaning') price = 150;
    else if (service === 'express') price = 80;

    const total = price * quantity;
    document.getElementById('estimated-total').textContent = `₱${total.toFixed(2)}`;
}

function submitBooking(event) {
    event.preventDefault();
    showToast('Order placed successfully! We will contact you shortly.');
    document.getElementById('booking-form').reset();
    document.getElementById('estimated-total').textContent = '₱0.00';
    showCustomerSection('orders');
}

// ==================== ORDER MANAGEMENT ====================
function updateOrderStatus(orderId, status) {
    showToast(`Order #${orderId} updated to ${status}`);
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for booking
    const dateInput = document.getElementById('schedule-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Add event listeners for price calculation
    const serviceType = document.getElementById('service-type');
    const quantity = document.getElementById('quantity');
    
    if (serviceType) {
        serviceType.addEventListener('change', calculateTotal);
    }
    
    if (quantity) {
        quantity.addEventListener('input', calculateTotal);
    }
});
