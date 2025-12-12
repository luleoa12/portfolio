
// Show a toast notification
export function showToast(type = 'success', message) {
    // Create container if it doesn't exist
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    
    // Create toast element
    const el = document.createElement('div');
    el.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
    
    // Set toast content
    el.innerHTML = `
        <div class="toast-icon">${type === 'error' ? '!' : '✓'}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="Close">×</button>
    `;
    
    // Add to container
    container.appendChild(el);
    
    // Trigger reflow to enable animation
    void el.offsetWidth;
    el.classList.add('show');
    
    // Close button handler
    const closeButton = el.querySelector('.toast-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => removeToast(el));
    }
    
    // Auto-remove after delay
    const autoRemove = setTimeout(() => {
        removeToast(el);
    }, 5000);
    
    // Hover behavior
    el.addEventListener('mouseenter', () => clearTimeout(autoRemove));
    el.addEventListener('mouseleave', () => {
        setTimeout(() => removeToast(el), 1000);
    });
    
    function removeToast(toastElement) {
        if (!toastElement) return;
        
        toastElement.classList.remove('show');
        toastElement.classList.add('hide');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (toastElement.parentNode === container) {
                container.removeChild(toastElement);
            }
        }, 300);
    }
}
