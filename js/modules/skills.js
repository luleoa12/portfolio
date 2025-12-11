
export function initSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            
            const x = e.clientX - rect.left - (size / 2);
            const y = e.clientY - rect.top - (size / 2);
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
}
