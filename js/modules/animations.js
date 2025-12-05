
export function initAnimations() {
    document.querySelectorAll('.achievement-card').forEach(card => {
        let isLeaving = false;
        let leaveTimeout;
        
        const updateGradientPosition = (x, y) => {
            if (isLeaving) return;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.classList.remove('leaving');
        };
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
            
            if (leaveTimeout) {
                clearTimeout(leaveTimeout);
                leaveTimeout = null;
            }
            
            if (isLeaving) {
                isLeaving = false;
                card.classList.remove('leaving');
            }
            
            updateGradientPosition(x, y);
        });

        card.addEventListener('mouseleave', () => {
            isLeaving = true;
            card.classList.add('leaving');
            
            leaveTimeout = setTimeout(() => {
                card.style.setProperty('--mouse-x', '-9999px');
                card.style.setProperty('--mouse-y', '-9999px');
                card.classList.remove('leaving');
                isLeaving = false;
            }, 300);
        });
    });
}
