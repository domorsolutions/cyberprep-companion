// Navigation logic for tab switching
const navItems = document.querySelectorAll('.nav-btn');
const screens = document.querySelectorAll('.screen');

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const screenId = item.getAttribute('data-screen');

    navItems.forEach(nav => nav.classList.remove('active'));
    screens.forEach(screen => screen.classList.remove('active'));

    item.classList.add('active');
    document.getElementById(screenId).classList.add('active');

    localStorage.setItem('activeScreen', screenId);
  });
});

// Restore last active screen from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedScreen = localStorage.getItem('activeScreen');
  if (savedScreen) {
    const targetTab = document.querySelector(`.nav-btn[data-screen="${savedScreen}"]`);
    const targetScreen = document.getElementById(savedScreen);
    if (targetTab && targetScreen) {
      navItems.forEach(nav => nav.classList.remove('active'));
      screens.forEach(screen => screen.classList.remove('active'));
      targetTab.classList.add('active');
      targetScreen.classList.add('active');
    }
  }
});

// Study Plan checklist persistence
const studyCheckboxes = document.querySelectorAll('.study-plan-task input[type="checkbox"]');
studyCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    localStorage.setItem(checkbox.id, checkbox.checked);
  });
  const savedState = localStorage.getItem(checkbox.id);
  if (savedState) checkbox.checked = savedState === 'true';
});

// Study Plan time selector persistence
const studyTimeSelect = document.querySelector('#study-time');
if (studyTimeSelect) {
  studyTimeSelect.addEventListener('change', () => {
    localStorage.setItem('study-time', studyTimeSelect.value);
  });
  const savedTime = localStorage.getItem('study-time');
  if (savedTime) {
    studyTimeSelect.value = savedTime;
  }
}
