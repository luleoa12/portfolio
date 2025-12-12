export function showToast(type = 'success', message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    
    const el = document.createElement('div');
    el.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
    
    el.innerHTML = `
        <div class="toast-icon">${type === 'error' ? '!' : '✓'}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="Close">×</button>
    `;
    
    container.appendChild(el);
    
    void el.offsetWidth;
    el.classList.add('show');
    
    const closeButton = el.querySelector('.toast-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => removeToast(el));
    }
    
    const autoRemove = setTimeout(() => {
        removeToast(el);
    }, 5000);
    
    el.addEventListener('mouseenter', () => clearTimeout(autoRemove));
    el.addEventListener('mouseleave', () => {
        setTimeout(() => removeToast(el), 1000);
    });
    
    function removeToast(toastElement) {
        if (!toastElement) return;
        
        toastElement.classList.remove('show');
        toastElement.classList.add('hide');
        
        setTimeout(() => {
            if (toastElement.parentNode === container) {
                container.removeChild(toastElement);
            }
        }, 300);
    }
}
