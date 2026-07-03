document.addEventListener('DOMContentLoaded', () => {
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');

  // Slide menu in
  openMenuBtn.addEventListener('click', () => {
    menuOverlay.classList.add('active');
  });

  // Slide menu out
  closeMenuBtn.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
  });
});
