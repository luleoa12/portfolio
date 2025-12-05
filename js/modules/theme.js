export function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme : (systemPrefersLight ? 'light' : 'dark');
    
    html.classList.toggle('light-mode', initialTheme === 'light');
    html.setAttribute('data-theme', initialTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = html.classList.contains('light-mode');
            const newTheme = isLight ? 'dark' : 'light';
            html.classList.toggle('light-mode', newTheme === 'light');
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    if (!savedTheme && window.matchMedia) {
        const media = window.matchMedia('(prefers-color-scheme: light)');
        media.addEventListener('change', e => {
            const theme = e.matches ? 'light' : 'dark';
            html.classList.toggle('light-mode', theme === 'light');
            html.setAttribute('data-theme', theme);
        });
    }
}
