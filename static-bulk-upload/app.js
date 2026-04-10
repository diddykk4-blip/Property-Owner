document.addEventListener('DOMContentLoaded', () => {
    // UPC Generation Mock
    const btnRegenerateUpc = document.getElementById('btnRegenerateUpc');
    const upcCode = document.getElementById('upcCode');

    btnRegenerateUpc.addEventListener('click', () => {
        const newUpc = Math.floor(Math.random() * 900000000000) + 100000000000;
        upcCode.value = newUpc;
        
        btnRegenerateUpc.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> Regenerated';
        btnRegenerateUpc.style.color = 'var(--success-base, #0F973D)';
        
        setTimeout(() => {
            btnRegenerateUpc.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Regenerate';
            btnRegenerateUpc.style.color = '';
        }, 2000);
    });

    // File Upload Area Drag & Drop
    const uploadArea = document.getElementById('imageUploadArea');
    const imageInput = document.getElementById('imageInput');
    const previewGrid = document.getElementById('imagePreviewGrid');

    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        }, false);
    });

    uploadArea.addEventListener('drop', (e) => {
        const dts = e.dataTransfer;
        const files = dts.files;
        handleFiles(files);
    });

    imageInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        ([...files]).forEach(uploadFile);
    }

    function uploadFile(file) {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            const previewContainer = document.createElement('div');
            previewContainer.className = 'image-preview';
            
            const img = document.createElement('img');
            img.src = reader.result;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'image-preview-remove';
            removeBtn.innerHTML = '✖';
            removeBtn.type = 'button';
            removeBtn.onclick = function(e) {
                e.stopPropagation();
                previewGrid.removeChild(previewContainer);
            };
            
            previewContainer.appendChild(img);
            previewContainer.appendChild(removeBtn);
            previewGrid.appendChild(previewContainer);
        };
    }
    
    // Form Submission
    const uploadForm = document.getElementById('productUploadForm');
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Optional: Add simple success message here
        const submitBtn = uploadForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Mock API call
        setTimeout(() => {
            submitBtn.textContent = 'Submitted for Approval';
            submitBtn.style.backgroundColor = 'var(--success-base, #0F973D)';
            submitBtn.style.color = '#fff';
            setTimeout(() => {
                uploadForm.reset();
                previewGrid.innerHTML = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 3000);
        }, 1500);
    });
});
