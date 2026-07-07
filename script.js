document.addEventListener('DOMContentLoaded', () => {
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');

  const openMenu = () => menuOverlay.classList.add('active');
  const closeMenu = () => menuOverlay.classList.remove('active');

  openMenuBtn.addEventListener('click', openMenu);
  openMenuBtn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMenu();
    }
  });

  closeMenuBtn.addEventListener('click', closeMenu);

  const removeElfsightBadge = () => {
    document
      .querySelectorAll('a[href*="elfsight.com/instagram-feed-instashow/"]')
      .forEach((link) => link.remove());
  };

  removeElfsightBadge();

  const widgetRoot = document.querySelector('.instagram-embed');
  if (widgetRoot) {
    const observer = new MutationObserver(() => removeElfsightBadge());
    observer.observe(widgetRoot, { childList: true, subtree: true });
  }
});
