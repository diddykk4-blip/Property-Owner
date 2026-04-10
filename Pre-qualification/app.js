// Pre-qualification Checklist Interactivity

// Modal Handling
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modals on clicking overlay background
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// App logic specific to check 3 override
function approveCheck3() {
    closeModal('modal-h3');
    
    // Simulate check 3 verification
    const flaggedItem = document.querySelector('.check-item-agent.flagged');
    if (flaggedItem) {
        flaggedItem.classList.remove('flagged');
        
        // Update header & status
        const titleDiv = flaggedItem.querySelector('.check-item-title .check-number');
        if (titleDiv) {
            titleDiv.style.background = 'var(--n-50)';
            titleDiv.style.color = 'var(--n-700)';
        }
        
        const badge = flaggedItem.querySelector('.status-badge');
        if (badge) {
            badge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified (Override)';
        }
        
        // Remove flagged details and action buttons
        const details = flaggedItem.querySelector('.flagged-details');
        const actions = flaggedItem.querySelector('.action-buttons');
        if (details) details.remove();
        if (actions) actions.remove();
        
        // Simulate item 4 (Auto-processing) resolving to verified too (just for demo flow)
        setTimeout(() => {
            const processingItems = document.querySelectorAll('.status-processing');
            if (processingItems.length > 0) {
                const badge4 = processingItems[0];
                badge4.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified (Auto)';
                // Item 4 specifically
                const parent4 = badge4.closest('.check-item-agent');
                const para = parent4.querySelector('p');
                if (para) para.remove();

                // Now all are verified, unlock item 7 and Sign Off button
                unlockFinalCheck();
            }
        }, 1500);
    }
}

function unlockFinalCheck() {
    const pendingItem = document.querySelector('.status-pending');
    if (pendingItem) {
        const parent7 = pendingItem.closest('.check-item-agent');
        parent7.style.opacity = '1';
        
        pendingItem.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified (Score: 85/100)';
        const para = parent7.querySelector('p');
        if (para) para.textContent = "Risk profile acceptable for structural assessment phase.";
        
        // Enable Sign Off Button
        const signOffBtn = document.getElementById('btn-signoff');
        if (signOffBtn) {
            signOffBtn.removeAttribute('disabled');
            signOffBtn.title = '';
        }

        // Change global status
        const statusSpan = document.querySelector('.agent-badge').nextElementSibling;
        if(statusSpan) {
            statusSpan.innerHTML = 'Status: <span style="color: var(--success-base);">100% Ready</span>';
        }
    }
}
