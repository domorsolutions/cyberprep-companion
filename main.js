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

  updateProgressBar();
});

// Study Plan checklist persistence and progress update
const studyCheckboxes = document.querySelectorAll('.study-plan-task input[type="checkbox"]');
studyCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    localStorage.setItem(checkbox.id, checkbox.checked);
    updateProgressBar();
  });
  const savedState = localStorage.getItem(checkbox.id);
  if (savedState) checkbox.checked = savedState === 'true';
});

function updateProgressBar() {
  const total = studyCheckboxes.length;
  const completed = Array.from(studyCheckboxes).filter(cb => cb.checked).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const progressFill = document.querySelector('.progress-fill');
  const progressLabel = document.querySelector('.progress-label');
  if (progressFill && progressLabel) {
    progressFill.style.width = `${percent}%`;
    progressLabel.textContent = `Study Progress: ${percent}%`;
  }
}

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

// Daily Planner drag & drop
window.addEventListener('DOMContentLoaded', () => {
  const draggables = document.querySelectorAll('.draggable');
  const dropzones = document.querySelectorAll('.planner-block');

  draggables.forEach(item => {
    item.addEventListener('dragstart', () => {
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });

  dropzones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      if (dragging) zone.appendChild(dragging);
    });
  });

  // Restore saved planner layout
  dropzones.forEach(zone => {
    const zoneId = zone.getAttribute('id');
    const saved = localStorage.getItem(`planner-${zoneId}`);
    if (saved) {
      zone.innerHTML = saved;
    }
  });

  // Save on drop
  dropzones.forEach(zone => {
    zone.addEventListener('drop', () => {
      const zoneId = zone.getAttribute('id');
      localStorage.setItem(`planner-${zoneId}`, zone.innerHTML);
    });
  });
});
