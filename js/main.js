import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initTabs } from './modules/tabs.js';
import { initForm } from './modules/form.js';
import { initAnimations } from './modules/animations.js';
import { initSkills } from './modules/skills.js';
import { initProjectCards } from './modules/projectCards.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initTabs();
    initForm();
    initAnimations();
    initSkills();
    initProjectCards();
});