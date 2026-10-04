(function () {
  'use strict';
  var sidebar = document.querySelector('.homepage #main > .sidebar');
  if (!sidebar) return;
  var desktop = window.matchMedia('(min-width: 925px)');
  function updateSidebar() {
    // A short viewport must still allow the entire profile to be reached.
    var fits = sidebar.getBoundingClientRect().height + 96 + 16 <= window.innerHeight;
    sidebar.classList.toggle('sidebar--scrollable', desktop.matches && !fits);
  }
  window.addEventListener('resize', updateSidebar);
  if (typeof ResizeObserver === 'function') new ResizeObserver(updateSidebar).observe(sidebar);
  if (document.fonts) document.fonts.ready.then(updateSidebar);
  updateSidebar();
}());
