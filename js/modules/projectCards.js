
export function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectTitle = card.querySelector('.project-title')?.textContent.trim();
        if (projectTitle === 'MakeCore') {
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', function(e) {
                if (e.target.closest('.discover-btn')) {
                    return;
                }
                
                window.open('https://makecore.org', '_blank');
            });
        }
        if (projectTitle === 'Portfolio') {
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', function(e) {
                if (e.target.closest('.discover-btn')) {
                    return;
                }
                
                window.open('https://luleoa12.github.io/portfolio', '_blank');
            });
        }
    });
}
