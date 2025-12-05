
export function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const timelineContents = document.querySelectorAll('.timeline-content');

    if (tabButtons.length > 0 && timelineContents.length > 0) {
        tabButtons[0].classList.add('active');
        timelineContents[0].classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            timelineContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(`${tabId}-timeline`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}
