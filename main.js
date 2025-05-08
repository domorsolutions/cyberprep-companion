// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Function to show selected screen and update navigation
  function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show selected screen
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) {
      selectedScreen.classList.add('active');
    }

    // Remove active class from all nav buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => nav.classList.remove('active'));

    // Add active class to clicked nav button
    const activeNav = document.querySelector(`[data-screen="${screenId}"]`);
    if (activeNav) {
      activeNav.classList.add('active');
    }
  }

  // Add click event listeners to nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      const screenId = item.getAttribute('data-screen');
      showScreen(screenId);
    });
  });

  // Initialize with Dashboard active
  showScreen('dashboard');
});
