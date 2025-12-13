document.addEventListener('DOMContentLoaded', function() {
    const safariWindow = document.querySelector('.safari-window');
    const safariOuter = document.querySelector('.safari-outer');
    const safariContent = document.querySelector('.safari-content');
    const redBtn = document.querySelector('.safari-controls .red');
    const yellowBtn = document.querySelector('.safari-controls .yellow');
    const greenBtn = document.querySelector('.safari-controls .green');

    if (!safariWindow || !redBtn || !yellowBtn || !greenBtn) return;

    const originalHeight = safariWindow.offsetHeight;
    const originalOuterHeight = safariOuter.offsetHeight;
    
    let modal = null;
    let svgContainer = null;
    
    const updateModalImage = () => {
        if (!svgContainer) return;
        
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const currentProject = window.location.pathname.includes('makecore') ? 'makecore' : 'portfolio';
        const svgPath = `/assets/project_img/${currentProject}/${currentProject}_${isDarkMode ? 'dark' : 'light'}.svg`;
        
        const svgHTML = `
            <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <image href="${svgPath}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"/>
            </svg>
        `;
        
        svgContainer.innerHTML = svgHTML;
        
        svgContainer.querySelector('image').onerror = function() {
            console.error('Failed to load SVG image');
            const fallbackPath = `assets/project_img/${currentProject}/${currentProject}_${isDarkMode ? 'dark' : 'light'}.svg`;
            this.href.baseVal = fallbackPath;
        };
    };
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                if (modal && modal.style.display === 'flex') {
                    updateModalImage();
                }
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    redBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        safariWindow.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        safariOuter.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        
        safariWindow.style.height = `${safariWindow.offsetHeight}px`;
        safariOuter.style.height = `${safariOuter.offsetHeight}px`;
        
        void safariWindow.offsetHeight;
        
        safariWindow.style.transform = 'scale(0.9) translateY(-10px)';
        safariWindow.style.opacity = '0';
        safariWindow.style.height = '0px';
        safariOuter.style.height = '0px';
        safariOuter.style.marginTop = '40px';
        safariOuter.style.marginBottom = '20px';
        
        this.setAttribute('aria-pressed', 'true');
    });

    yellowBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (safariWindow.classList.contains('minimized')) {
            safariWindow.style.transition = 'height 0.3s ease';
            safariOuter.style.transition = 'height 0.3s ease';
            safariContent.style.transition = 'opacity 0.3s ease';
            
            safariWindow.style.height = `${originalHeight}px`;
            safariOuter.style.height = `${originalOuterHeight}px`;
            safariContent.style.opacity = '1';
            safariContent.style.pointerEvents = 'auto';
            safariWindow.classList.remove('minimized');
            this.setAttribute('aria-pressed', 'false');
        } else {
            const navbarHeight = document.querySelector('.safari-chrome').offsetHeight + 30;

            const fastEase = 'cubic-bezier(0.25, 1, 0.5, 1)';

            safariWindow.style.transition = `height 0.32s ${fastEase}`;
            safariOuter.style.transition = `height 0.32s ${fastEase}`;

            safariContent.style.transition = `
                opacity 0.22s ease,
                transform 0.28s ${fastEase},
                filter 0.22s ease
            `;
            safariContent.style.transformOrigin = 'top center';

            safariContent.style.opacity = '1';
            safariContent.style.transform = 'translateY(0) scale(1)';
            safariContent.style.filter = 'none';
            safariWindow.style.height = `${safariWindow.offsetHeight}px`;
            safariOuter.style.height = `${safariOuter.offsetHeight}px`;

            void safariWindow.offsetHeight;

            safariContent.style.opacity = '0';
            safariContent.style.transform = 'translateY(-14px) scale(0.97)';
            safariContent.style.filter = 'blur(3px)';

            setTimeout(() => {
                safariWindow.style.height = `${navbarHeight}px`;
                safariOuter.style.height = `${navbarHeight}px`;
                safariContent.style.pointerEvents = 'none';
                safariWindow.classList.add('minimized');
            }, 100);

            setTimeout(() => {
                safariContent.style.transform = 'scale(1)';
                safariContent.style.filter = 'none';
            }, 320);

            this.setAttribute('aria-pressed', 'true');
        }
    });

    greenBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopPropagation();
        
        const isZoomed = !modal || modal.style.display === 'none';
        
        if (isZoomed) {
            if (!modal) {
                modal = document.createElement('div');
                modal.className = 'image-modal';
                
                const closeBtn = document.createElement('button');
                closeBtn.className = 'modal-close';
                closeBtn.innerHTML = '&times;';
                closeBtn.setAttribute('aria-label', 'Close image');
                
                const imgContainer = document.createElement('div');
                imgContainer.className = 'modal-image-container';
                
                svgContainer = document.createElement('div');
                svgContainer.className = 'modal-image';
                svgContainer.style.width = '100%';
                svgContainer.style.height = '100%';
                
                imgContainer.appendChild(svgContainer);
                
                modal.appendChild(closeBtn);
                modal.appendChild(imgContainer);
                document.body.appendChild(modal);
                
                const closeModal = () => {
                    modal.style.opacity = '0';
                    document.body.style.overflow = '';
                    setTimeout(() => {
                        modal.style.display = 'none';
                        greenBtn.setAttribute('aria-pressed', 'false');
                    }, 300);
                };
                
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeModal();
                });
                
                const handleEscape = (e) => {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', handleEscape);
                    }
                };
                
                document.addEventListener('keydown', handleEscape);
                
                modal.addEventListener('click', (e) => {
                    if (e.target === modal || e.currentTarget === modal) {
                        closeModal();
                    }
                });
            }
            
            modal.style.display = 'flex';
            void modal.offsetWidth;
            updateModalImage();
            modal.style.opacity = '1';
            document.body.style.overflow = 'hidden';
            this.setAttribute('aria-pressed', 'true');
            
        } else if (modal) {
            modal.style.opacity = '0';
            document.body.style.overflow = '';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            this.setAttribute('aria-pressed', 'false');
        }
    });

    [redBtn, yellowBtn, greenBtn].forEach(btn => {
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('aria-label', 
            btn === redBtn ? 'Close window' : 
            btn === yellowBtn ? 'Minimize window' : 'Maximize window');
        
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

