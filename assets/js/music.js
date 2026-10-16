(function () {
  'use strict';
  var input = document.querySelector('[data-music-search]');
  if (!input) return;
  var albums = Array.from(document.querySelectorAll('[data-music-album]'));
  var count = document.querySelector('[data-music-count]');
  var clear = document.querySelector('[data-music-clear]');
  var empty = document.querySelector('[data-music-no-results]');
  function normalize(value) { return value.normalize('NFKC').toLocaleLowerCase().trim(); }
  function filter() {
    var terms = normalize(input.value).split(/\s+/).filter(Boolean);
    var visible = 0;
    albums.forEach(function (album) {
      var haystack = normalize(album.dataset.search);
      album.hidden = !terms.every(function (term) { return haystack.includes(term); });
      if (!album.hidden) visible += 1;
    });
    count.textContent = terms.length ? visible + ' / ' + albums.length + ' 张专辑' : albums.length + ' 张专辑';
    clear.hidden = !input.value;
    empty.hidden = visible !== 0;
  }
  function reset() { input.value = ''; filter(); input.focus(); }
  input.addEventListener('input', filter);
  input.addEventListener('keydown', function (event) { if (event.key === 'Escape') reset(); });
  clear.addEventListener('click', reset);
  document.querySelector('[data-music-reset]').addEventListener('click', reset);
}());
