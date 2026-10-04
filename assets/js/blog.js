(function () {
  'use strict';
  var cards = Array.from(document.querySelectorAll('.blog-card'));
  var filters = Array.from(document.querySelectorAll('[data-filter]'));
  var search = document.querySelector('.blog-search input');
  var activeTag = '';
  function filterPosts() {
    var query = search ? search.value.trim().toLocaleLowerCase() : '';
    var shown = 0;
    cards.forEach(function (card) {
      var tags = JSON.parse(card.dataset.tags || '[]');
      card.hidden = (activeTag && tags.indexOf(activeTag) < 0) || card.textContent.toLocaleLowerCase().indexOf(query) < 0;
      if (!card.hidden) shown++;
    });
    var empty = document.querySelector('.blog-no-results');
    if (empty) empty.hidden = shown > 0;
  }
  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      activeTag = button.dataset.filter;
      filters.forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      filterPosts();
    });
  });
  if (search) search.addEventListener('input', filterPosts);
  var content = document.querySelector('.blog-content');
  if (!content) return;
  // Supply the editor DOM classes expected by the verbatim Typora stylesheet.
  content.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(function (heading) {
    if (!heading.querySelector('span')) {
      var span = document.createElement('span');
      while (heading.firstChild) span.appendChild(heading.firstChild);
      heading.appendChild(span);
    }
  });
  content.querySelectorAll('pre').forEach(function (pre) { pre.classList.add('md-fences'); });
  content.querySelectorAll('img').forEach(function (image) {
    if (image.parentElement.classList.contains('md-image')) return;
    var wrapper = document.createElement('span');
    wrapper.className = 'md-image';
    wrapper.setAttribute('alt', image.alt);
    image.parentNode.insertBefore(wrapper, image);
    wrapper.appendChild(image);
  });
  content.querySelectorAll('sup[id^="fnref"]').forEach(function (note) { note.classList.add('md-footnote'); });
  content.querySelectorAll('li input[type="checkbox"]').forEach(function (input) {
    input.closest('li').classList.add('md-task-list-item');
  });
  content.querySelectorAll('a[href^="#"]').forEach(function (link) { link.target = '_self'; });
  var text = content.textContent;
  var chinese = (text.match(/[\u3400-\u9fff]/g) || []).length;
  var words = text.replace(/[\u3400-\u9fff]/g, '').trim().split(/\s+/).filter(Boolean).length;
  document.querySelector('.reading-time').textContent = '约 ' + Math.max(1, Math.ceil(chinese / 350 + words / 220)) + ' 分钟阅读';
  var headings = Array.from(content.querySelectorAll('h2, h3'));
  var toc = document.querySelector('.blog-toc');
  var links = [];
  if (headings.length) {
    toc.hidden = false;
    if (window.matchMedia('(max-width: 950px)').matches) toc.querySelector('details').open = false;
    headings.forEach(function (heading, index) {
      if (!heading.id) heading.id = 'section-' + index;
      var link = document.createElement('a');
      link.href = '#' + encodeURIComponent(heading.id);
      link.target = '_self';
      link.textContent = heading.textContent;
      link.dataset.level = heading.tagName.slice(1);
      toc.querySelector('nav').appendChild(link);
      links.push(link);
    });
  }
  var progress = document.querySelector('.reading-progress');
  function onScroll() {
    var rect = content.getBoundingClientRect();
    var distance = content.offsetHeight - window.innerHeight;
    var value = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : (rect.top <= 0 ? 1 : 0);
    progress.style.transform = 'scaleX(' + value + ')';
    var current = 0;
    headings.forEach(function (heading, index) { if (heading.getBoundingClientRect().top <= 110) current = index; });
    links.forEach(function (link, index) { if (index === current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  content.querySelectorAll('table').forEach(function (table) {
    var wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', '表格，可横向滚动');
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
  if (navigator.clipboard && window.isSecureContext) {
    content.querySelectorAll('div.highlighter-rouge').forEach(function (block) {
      var code = block.querySelector('pre code');
      if (!code) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-code';
      button.textContent = '复制';
      button.setAttribute('aria-label', '复制代码');
      button.addEventListener('click', function () {
        navigator.clipboard.writeText(code.textContent).then(function () {
          button.textContent = '已复制';
          window.setTimeout(function () { button.textContent = '复制'; }, 1800);
        }).catch(function () { button.textContent = '请手动复制'; });
      });
      block.appendChild(button);
    });
  }
}());
