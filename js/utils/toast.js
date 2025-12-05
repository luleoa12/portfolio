
export function showToast(type, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
    
    el.innerHTML = `
        <div class="toast-icon">${type === 'error' ? '!' : '✓'}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="Close">×</button>
    `;
    
    container.appendChild(el);
    
    const closeButton = el.querySelector('.toast-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            removeToast(el);
        });
    }
    
    const autoRemove = setTimeout(() => {
        removeToast(el);
    }, 3800);
    
    function removeToast(toastElement) {
        toastElement.classList.add('hide');
        setTimeout(() => {
            if (toastElement.parentNode === container) {
                container.removeChild(toastElement);
            }
        }, 500);
    }
    
    el.addEventListener('mouseenter', () => {
        clearTimeout(autoRemove);
    });
    
    el.addEventListener('mouseleave', () => {
        setTimeout(() => {
            removeToast(el);
        }, 1000);
    });
}
