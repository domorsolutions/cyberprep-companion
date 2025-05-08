// Wait for DOM to be fully loaded

// DOMContentLoaded to safely bind after all DOM elements are present
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

  // Study Plan checklist persistence and progress update
  const studyCheckboxes = document.querySelectorAll('.study-plan-task input[type="checkbox"]');

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

  studyCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      localStorage.setItem(checkbox.id, checkbox.checked);
      updateProgressBar();
    });
    const savedState = localStorage.getItem(checkbox.id);
    if (savedState) checkbox.checked = savedState === 'true';
  });

  updateProgressBar();

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
  // Collapsible domain toggle logic
const domainToggles = document.querySelectorAll('.study-toggle');

domainToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.getAttribute('data-target');
    const content = document.getElementById(targetId);
    if (content) {
      content.classList.toggle('active');
     const domainTitle = toggle.textContent.replace(/^▶️|▼/, '').trim();
toggle.textContent = content.classList.contains('active')
  ? `▼ ${domainTitle}`
  : `▶️ ${domainTitle}`;
    }
  });
});

// Domain XP + Progress calculation
const studySections = document.querySelectorAll('.study-section');

function updateAllDomainProgress() {
  studySections.forEach(section => {
    const domainId = section.getAttribute('data-domain');
    const tasks = section.querySelectorAll('.study-plan-task input[type="checkbox"]');
    const completed = Array.from(tasks).filter(cb => cb.checked).length;

    const progressBar = section.querySelector('.domain-progress-fill');
    const xpLabel = section.querySelector('.domain-xp-label');
    const clearedTag = section.querySelector('.domain-cleared-tag');

    const xpTotal = tasks.length;
    const xpPercent = xpTotal === 0 ? 0 : Math.round((completed / xpTotal) * 100);

    if (progressBar) progressBar.style.width = `${xpPercent}%`;
    if (xpLabel) xpLabel.textContent = `XP: ${completed} / ${xpTotal}`;

    if (completed === xpTotal && xpTotal > 0) {
      section.classList.add('cleared');
    } else {
      section.classList.remove('cleared');
    }
  });
}

// Attach checkbox listeners for all domains
document.querySelectorAll('.study-plan-task input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    localStorage.setItem(cb.id, cb.checked);
    updateAllDomainProgress();
  });

  const saved = localStorage.getItem(cb.id);
  if (saved !== null) {
    cb.checked = saved === 'true';
  }
});

// Run on load
updateAllDomainProgress();
});
