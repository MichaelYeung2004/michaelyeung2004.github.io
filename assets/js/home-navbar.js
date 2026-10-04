(function () {
  var button = document.querySelector('.site-navbar .navbar-toggler');
  var menu = document.getElementById('navbarResponsive');
  if (!button || !menu) return;
  button.addEventListener('click', function () {
    var open = menu.classList.toggle('show');
    button.setAttribute('aria-expanded', String(open));
  });
}());
