// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Navigation logic
  const navItems = document.querySelectorAll('.nav-item');
  const screens = document.querySelectorAll('.screen');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      // Remove active class from all nav items and screens
      navItems.forEach(nav => nav.classList.remove('active'));
      screens.forEach(screen => screen.classList.remove('active'));
      // Add active class to clicked nav item and corresponding screen
      item.classList.add('active');
      const screenId = item.getAttribute('data-screen');
      document.getElementById(screenId).classList.add('active');
    });
  });
});