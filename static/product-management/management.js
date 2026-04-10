/**
 * MANAGEMENT SYSTEM CORE LOGIC
 * Shared script for the Product Management modular interface.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCollapsibles();
    initNotifications();
    initUPC();
});

/**
 * Handle collapsible sections (e.g., in add-product.html)
 */
function initCollapsibles() {
    const headers = document.querySelectorAll('.collapsible-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const section = header.closest('.collapsible-section');
            const body = section.querySelector('.card-body');
            
            // Toggle visibility
            if (body.style.display === 'none') {
                body.style.display = 'block';
            } else {
                body.style.display = 'none';
            }
        });
    });
}

/**
 * Simple notification dropdown toggle
 */
function initNotifications() {
    const bell = document.querySelector('.notification-bell');
    if (bell) {
        bell.addEventListener('click', (e) => {
            e.stopPropagation();
            alert('Notifications coming soon! Total: 3 unread.');
        });
    }
}

/**
 * UPC Regeneration Logic
 */
function initUPC() {
    const regenBtn = document.querySelector('.upc-display .btn-secondary');
    const upcCode = document.querySelector('.upc-code');
    
    if (regenBtn && upcCode) {
        regenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const newUPC = Math.floor(Math.random() * 900000000000) + 100000000000;
            upcCode.textContent = newUPC;
            upcCode.style.color = 'var(--primary-base)';
            setTimeout(() => upcCode.style.color = '', 500);
        });
    }
}

/**
 * Generic Modal Simulation (for standalone pages)
 */
window.closeReview = function() {
    window.location.href = 'pending.html';
};

window.approveProduct = function() {
    if (confirm('Are you sure you want to approve this product and sync to PrestaShop?')) {
        alert('Product approved and synced successfully!');
        window.location.href = 'index.html';
    }
};
