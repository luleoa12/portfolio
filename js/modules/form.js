import { showToast } from '../utils/toast.js';

export function initForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                showToast('success', 'Message sent. Thank you!');
                this.reset();
            } else {
                const data = await response.json().catch(() => null);
                const errorMessage = data?.errors?.map(x => x.message).join(', ') || 'Something went wrong. Please try again.';
                showToast('error', errorMessage);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showToast('error', 'Network error. Please try again later.');
        }
    });
}
