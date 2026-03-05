/**
 * app.js
 * Handles view transitions, form interactions, and state for the WealthMarket Application flow.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // VIEW MANAGEMENT & ROUTING
    // -------------------------------------------------------------------------
    const views = document.querySelectorAll('.view-section');
    const btnStarts = document.querySelectorAll('#btn-start-app');
    const btnNexts = document.querySelectorAll('.btn-next');
    const btnBacks = document.querySelectorAll('.btn-back');
    const btnJumps = document.querySelectorAll('.btn-jump');
    const btnReturnDash = document.getElementById('btn-return-dash');

    // UI Elements that change based on view
    const breadcrumbs = document.getElementById('app-breadcrumbs');
    const stepper = document.getElementById('app-stepper');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    // View State Configuration
    const viewConfig = {
        'screen-a': { showBreadcrumbs: false, showStepper: false, sidebarActive: 0, title: 'Dashboard' },
        'screen-b': { showBreadcrumbs: true, showStepper: true, stepActive: 1, sidebarActive: 1, title: 'Property Details' },
        'screen-c': { showBreadcrumbs: true, showStepper: true, stepActive: 2, sidebarActive: 1, title: 'Ownership & Docs' },
        'screen-d': { showBreadcrumbs: true, showStepper: true, stepActive: 3, sidebarActive: 1, title: 'Completion Status' },
        'screen-e': { showBreadcrumbs: true, showStepper: true, stepActive: 4, sidebarActive: 1, title: 'Recovery Preference' },
        'screen-f': { showBreadcrumbs: true, showStepper: true, stepActive: 5, sidebarActive: 1, title: 'Review & Submit' },
        'screen-g': { showBreadcrumbs: false, showStepper: false, sidebarActive: 1, title: 'Success' },
    };

    function navigateTo(targetId) {
        // Hide all views
        views.forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateAppShell(targetId);

            // Trigger auto-save visual on navigation
            triggerSave();
        }
    }

    function updateAppShell(viewId) {
        const config = viewConfig[viewId];
        if (!config) return;

        // Toggle App Shell elements
        breadcrumbs.style.display = config.showBreadcrumbs ? 'flex' : 'none';
        stepper.style.display = config.showStepper ? 'block' : 'none';

        // Update Breadcrumbs current text
        if (config.showBreadcrumbs) {
            breadcrumbs.querySelector('.current').textContent = config.title;
        }

        // Update Sidebar
        sidebarItems.forEach((item, index) => {
            if (index === config.sidebarActive) item.classList.add('active');
            else item.classList.remove('active');
        });

        // Update Stepper visually
        if (config.showStepper) {
            const steps = document.querySelectorAll('.step');
            const connectors = document.querySelectorAll('.step-connector');

            steps.forEach((step, index) => {
                const stepNum = index + 1;
                step.classList.remove('active', 'done');

                if (stepNum < config.stepActive) {
                    step.classList.add('done');
                } else if (stepNum === config.stepActive) {
                    step.classList.add('active');
                }
            });

            connectors.forEach((conn, index) => {
                const stepNum = index + 1;
                if (stepNum < config.stepActive) {
                    conn.classList.add('done');
                } else {
                    conn.classList.remove('done');
                }
            });
        }
    }

    // Attach Navigation Listeners
    btnStarts.forEach(btn => btn.addEventListener('click', () => {
        // Find screen-b sidebar item and make it active, remove active from others
        sidebarItems.forEach(item => item.classList.remove('active'));
        if (navApplications) navApplications.classList.add('active');
        navigateTo('screen-b');
    }));
    btnBacks.forEach(btn => btn.addEventListener('click', (e) => navigateTo(e.target.dataset.back)));
    btnJumps.forEach(btn => btn.addEventListener('click', (e) => navigateTo(e.target.dataset.target)));

    // Form verification for Next buttons (Mock validation)
    btnNexts.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.dataset.next;

            // Add specific logic for Step 3 (Screen D) Eligibility
            if (btn.id === 'btn-to-step-4') {
                const val = parseInt(document.getElementById('completion-slider-input').value);
                if (val < 50) {
                    alert('You must have at least 50% completion to proceed.');
                    return; // Block navigation
                }
            }

            if (btn.textContent.includes('Submit')) {
                // Simulate API call delay on Submit
                const originalText = btn.textContent;
                btn.textContent = "Processing...";
                btn.disabled = true;
                setTimeout(() => {
                    navigateTo(target);
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 1500);
            } else {
                navigateTo(target);
            }
        });
    });

    if (btnReturnDash) {
        btnReturnDash.addEventListener('click', () => {
            // Reset app state fully and return to dashboard
            window.location.reload();
        });
    }

    // -------------------------------------------------------------------------
    // SIDEBAR INTERACTIONS
    // -------------------------------------------------------------------------

    // Toast Notification Logic
    function showToast(message) {
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = 'toast notification';

        // Add icon based on message (can be customized)
        const icon = document.createElement('span');
        icon.className = 'toast-icon';
        icon.innerHTML = 'ℹ️';

        const text = document.createElement('span');
        text.className = 'toast-text';
        text.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(text);
        toastContainer.appendChild(toast);

        // Active State Animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 300); // Wait for transition
        }, 5000);
    }

    // "My Applications" sidebar link
    const navApplications = document.getElementById('nav-applications');
    if (navApplications) {
        navApplications.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            showToast('No applications started.');
        });
    }

    // -------------------------------------------------------------------------
    // GLOBAL UI INTERACTIONS (Save Status)
    // -------------------------------------------------------------------------
    const saveStatus = document.getElementById('global-save-status');
    const saveText = saveStatus.querySelector('.save-text');
    let saveTimeout;

    function triggerSave() {
        if (!saveStatus) return;

        saveStatus.classList.add('saving');
        saveText.textContent = "Saving...";

        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveStatus.classList.remove('saving');
            saveText.textContent = "Saved";
        }, 800);
    }

    // Trigger save on any input change to simulate auto-save
    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('change', triggerSave);
        // For text inputs trigger on blur as well
        if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'number')) {
            el.addEventListener('blur', triggerSave);
        }
    });

    // -------------------------------------------------------------------------
    // SCREEN A: Dashboard Interactions
    // -------------------------------------------------------------------------
    const dashboardChecklist = document.getElementById('dashboard-checklist');
    if (dashboardChecklist) {
        dashboardChecklist.addEventListener('click', (e) => {
            const checkItem = e.target.closest('.check-item');
            if (!checkItem) return;

            const checkIcon = checkItem.querySelector('.check-icon');
            if (checkIcon) {
                if (checkIcon.classList.contains('pending')) {
                    checkIcon.classList.remove('pending');
                    checkIcon.classList.add('done');
                    checkIcon.textContent = '✓';
                } else {
                    checkIcon.classList.remove('done');
                    checkIcon.classList.add('pending');
                    checkIcon.textContent = '';
                }
                triggerSave(); // Trigger the save notification
            }
        });
    }

    // -------------------------------------------------------------------------
    const propCards = document.querySelectorAll('#property-type-selector .select-card');
    propCards.forEach(card => {
        card.addEventListener('click', () => {
            propCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            triggerSave();
        });
    });

    // -------------------------------------------------------------------------
    // SCREEN C: Document Upload Interactions (Mock)
    // -------------------------------------------------------------------------
    const uploadZones = document.querySelectorAll('.upload-zone.empty');
    uploadZones.forEach(zone => {
        zone.addEventListener('click', () => {
            if (zone.classList.contains('empty')) {
                // Mock upload process
                const icon = zone.querySelector('.upload-icon');
                const filename = zone.querySelector('.upload-filename');
                const meta = zone.querySelector('.upload-meta');

                filename.textContent = 'Uploading...';

                setTimeout(() => {
                    zone.classList.remove('empty');
                    zone.classList.add('uploaded');
                    icon.classList.remove('empty-icon');
                    // Retain the correct emoji based on id
                    if (zone.id === 'upload-mech') icon.textContent = '⚙️';
                    if (zone.id === 'upload-elec') icon.textContent = '⚡';
                    if (zone.id === 'upload-permit') icon.textContent = '📋';

                    filename.textContent = `Document_v1.pdf`;
                    meta.innerHTML = `2.1 MB · ✓ &nbsp;<span class="text-error remove-file">Remove</span>`;

                    // Attach event to new remove link
                    meta.querySelector('.remove-file').addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Reset zone
                        zone.classList.remove('uploaded');
                        zone.classList.add('empty');
                        icon.classList.add('empty-icon');
                        filename.textContent = 'Click to upload';
                        meta.textContent = 'PDF, JPG, PNG · max 50MB';
                        triggerSave();
                    });

                    triggerSave();
                }, 1000);
            }
        });
    });

    // Existing removed files functionality
    document.querySelectorAll('.remove-file').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const zone = e.target.closest('.upload-zone');
            if (zone) {
                const icon = zone.querySelector('.upload-icon');
                const filename = zone.querySelector('.upload-filename');
                const meta = zone.querySelector('.upload-meta');

                zone.classList.remove('uploaded');
                zone.classList.add('empty');
                if (icon) {
                    icon.classList.add('empty-icon');
                    // Reset to generic file icon if needed, or keep existing string
                }
                if (filename) filename.textContent = 'Click to upload';
                if (meta) meta.textContent = 'PDF, JPG, PNG · max 50MB';
                triggerSave();
            }
        });
    });

    // -------------------------------------------------------------------------
    // SCREEN D: Completion Slider Interactions
    // -------------------------------------------------------------------------
    const slider = document.getElementById('completion-slider-input');
    const sliderValDisplay = document.getElementById('completion-val-display');
    const sliderStatusMsg = document.getElementById('completion-status-msg');
    const sidebarEligibility = document.getElementById('sidebar-eligibility');
    const reviewCompVal = document.getElementById('review-comp-val'); // Link to Screen F
    const stageCheckboxes = document.querySelectorAll('.stage-check input[type="checkbox"]');

    function updateSliderUI(val) {
        sliderValDisplay.textContent = `${val}%`;

        const isEligible = val >= 50;

        // Update Status Message above slider
        if (isEligible) {
            sliderStatusMsg.classList.remove('ineligible');
            sliderStatusMsg.classList.add('eligible');
        } else {
            sliderStatusMsg.classList.remove('eligible');
            sliderStatusMsg.classList.add('ineligible');
        }

        // Update Sidebar Eligibility Card
        if (sidebarEligibility) {
            sidebarEligibility.querySelector('.elig-val').textContent = `${val}%`;
            if (isEligible) {
                sidebarEligibility.classList.remove('not-eligible');
                sidebarEligibility.querySelector('.elig-status').textContent = '✓ Meets minimum';
                sidebarEligibility.querySelector('.elig-sub').textContent = '50% required · You qualify';
            } else {
                sidebarEligibility.classList.add('not-eligible');
                sidebarEligibility.querySelector('.elig-status').textContent = '✕ Below minimum';
                sidebarEligibility.querySelector('.elig-sub').textContent = '50% required to proceed';
            }
        }

        // Update Review Screen Value
        if (reviewCompVal) {
            reviewCompVal.textContent = isEligible ? `${val}% — Eligible ✓` : `${val}% — Ineligible ✕`;
            if (!isEligible) reviewCompVal.classList.add('text-error');
            else reviewCompVal.classList.remove('text-error');
        }
    }

    if (slider) {
        slider.addEventListener('input', (e) => {
            updateSliderUI(e.target.value);
            triggerSave();
        });
    }

    // Connect checkboxes to visuals
    stageCheckboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const label = e.target.closest('.stage-check');
            if (e.target.checked) label.classList.add('active');
            else label.classList.remove('active');
            triggerSave();
        });
    });

    // -------------------------------------------------------------------------
    // SCREEN E: Recovery Preference Interactions
    // -------------------------------------------------------------------------
    const recoveryCards = document.querySelectorAll('.recovery-card');
    const sidebarOptLabel = document.getElementById('sidebar-opt-label');
    const sidebarOptTitle = document.getElementById('sidebar-opt-title');
    const reviewRecVal = document.getElementById('review-rec-val'); // Link to Screen F

    recoveryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all
            recoveryCards.forEach(c => {
                c.classList.remove('active');
                c.querySelector('.radio-circle').classList.remove('active');
                c.querySelector('.radio-circle').innerHTML = '';
                c.querySelector('.badge-selected').classList.add('hidden');
            });

            // Add active to selected
            card.classList.add('active');
            card.querySelector('.radio-circle').classList.add('active');
            card.querySelector('.radio-circle').innerHTML = '<div class="radio-dot"></div>';
            card.querySelector('.badge-selected').classList.remove('hidden');

            // Update Sidebar and Review Screen
            const optLetter = card.dataset.option;
            const optTitle = card.dataset.title;

            if (sidebarOptLabel) sidebarOptLabel.textContent = `Option ${optLetter}`;
            if (sidebarOptTitle) sidebarOptTitle.textContent = optTitle;
            if (reviewRecVal) reviewRecVal.textContent = `Option ${optLetter} — ${optTitle}`;

            triggerSave();
        });
    });

    // Initialize Default States
    updateAppShell('screen-a');
});
