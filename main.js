// Wait for DOM to be fully loaded

document.addEventListener('DOMContentLoaded', () => {
  // Screen navigation logic
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

  // Attach navigation event listeners
  const navItems = document.querySelectorAll('.nav-btn');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const screenId = item.getAttribute('data-screen');
      showScreen(screenId);
    });
  });

  const lastActiveScreen = localStorage.getItem('activeScreen') || 'dashboard';
  showScreen(lastActiveScreen);

  // Study Plan XP and progress tracking
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

  // Checkbox persistence
  document.querySelectorAll('.study-plan-task input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      localStorage.setItem(cb.id, cb.checked);
      updateAllDomainProgress();
    });

    const saved = localStorage.getItem(cb.id);
    if (saved !== null) cb.checked = saved === 'true';
  });

  updateAllDomainProgress();

  // Study time selector persistence
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

  // Collapsible domain toggle
  const domainToggles = document.querySelectorAll('.study-toggle');

  domainToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const content = document.getElementById(targetId);

      if (content) {
        const isOpen = content.classList.toggle('active');
        const domainName = toggle.dataset.label || "Domain";
toggle.innerHTML = `${isOpen ? '▼' : '▶️'} ${domainName} <span class="domain-level">Level 1</span>`;
      }
      .study-toggle .arrow {
  display: inline-block;
  width: 1em;
  text-align: center;
  transition: transform 0.2s ease;
  margin-right: 8px;
  color: var(--text-color); /* or --primary or your own color */
}

/* Optional rotate when active */
.study-content:not(.active) + .arrow {
  transform: rotate(-90deg); /* Makes the arrow point sideways */
}
    });
  });

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

  // Dark Mode toggle
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
});
