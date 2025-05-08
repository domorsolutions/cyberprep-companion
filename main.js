// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Function to show selected screen and update navigation
  function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) {
      selectedScreen.classList.add('active');
    }

    const navItems = document.querySelectorAll('.nav-btn');
    navItems.forEach(nav => nav.classList.remove('active'));

    const activeNav = document.querySelector(`[data-screen="${screenId}"]`);
    if (activeNav) {
      activeNav.classList.add('active');
    }

    localStorage.setItem('activeScreen', screenId);
  }

  // Add click event listeners to nav items
  const navItems = document.querySelectorAll('.nav-btn');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const screenId = item.getAttribute('data-screen');
      showScreen(screenId);
    });
  });

  // On load, get the last active screen from localStorage or default to dashboard
  const lastActiveScreen = localStorage.getItem('activeScreen') || 'dashboard';
  showScreen(lastActiveScreen);

  if (typeof updateProgressBar === 'function') {
    updateProgressBar();
  }

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

  dropzones.forEach(zone => {
    const zoneId = zone.getAttribute('id');
    const saved = localStorage.getItem(`planner-${zoneId}`);
    if (saved) {
      zone.innerHTML = saved;
    }
  });

  dropzones.forEach(zone => {
    zone.addEventListener('drop', () => {
      const zoneId = zone.getAttribute('id');
      localStorage.setItem(`planner-${zoneId}`, zone.innerHTML);
    });
  });
  
// Dark Mode Toggle (with delay to ensure element is present)
setTimeout(() => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const darkPref = localStorage.getItem('darkMode');

  if (darkPref === 'enabled') {
    document.body.classList.add('dark');
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
      if (darkModeToggle.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }
}, 100);

// Load preference
const darkPref = localStorage.getItem('darkMode');
if (darkPref === 'enabled') {
  document.body.classList.add('dark');
  if (darkModeToggle) darkModeToggle.checked = true;
}

// Toggle handler
if (darkModeToggle) {
  darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}
});
