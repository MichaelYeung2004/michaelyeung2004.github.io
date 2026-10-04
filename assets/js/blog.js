(function () {
  'use strict';
  var cards = Array.from(document.querySelectorAll('.blog-card'));
  var tagFilter = document.querySelector('[data-tag-filter]');
  var search = document.querySelector('.blog-search input');
  var activeTag = '';
  var yearFilter = document.querySelector('[data-year-filter]');
  var categoryFilter = document.querySelector('[data-category-filter]');
  var more = document.querySelector('.blog-load-more');
  var resultCount = document.querySelector('.blog-result-count');
  var visibleLimit = 10;
  var scope = document.querySelector('[data-search-scope]');
  var list = document.querySelector('.blog-post-list');
  var segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('zh', { granularity: 'sentence' }) : null;
  function sentences(text) {
    return segmenter ? Array.from(segmenter.segment(text), function (item) { return item.segment.trim(); }).filter(Boolean) : (text.match(/[^。！？!?]+[。！？!?]?/g) || [text]);
  }
  function includesAll(text, terms) {
    var lower = text.toLocaleLowerCase();
    return terms.every(function (term) { return lower.indexOf(term) >= 0; });
  }
  function highlight(element, text, terms) {
    element.replaceChildren();
    var lower = text.toLocaleLowerCase();
    var cursor = 0;
    while (cursor < text.length) {
      var start = text.length;
      var length = 0;
      terms.forEach(function (term) {
        var position = lower.indexOf(term, cursor);
        if (position >= 0 && (position < start || (position === start && term.length > length))) { start = position; length = term.length; }
      });
      element.appendChild(document.createTextNode(text.slice(cursor, start)));
      if (!length) break;
      var mark = document.createElement('mark');
      mark.textContent = text.slice(start, start + length);
      element.appendChild(mark);
      cursor = start + length;
    }
  }
  var entries = cards.map(function (card) {
    var template = card.querySelector('.blog-search-body');
    var body = template.content.cloneNode(true);
    body.querySelectorAll('script,style').forEach(function (node) { node.remove(); });
    var paragraphs = Array.from(body.querySelectorAll('p,pre,h2,h3,h4,li,td'), function (node) { return node.textContent.trim(); }).filter(Boolean);
    var sentenceList = paragraphs.flatMap(sentences);
    var firstParagraph = body.querySelector('p');
    var title = card.querySelector('.blog-card-title a');
    var excerpt = card.querySelector('.blog-excerpt');
    return { card: card, titleElement: title, title: title.textContent, excerptElement: excerpt, excerpt: excerpt.textContent, description: card.dataset.description || excerpt.textContent, body: body.textContent, sentences: sentenceList, first: sentences(firstParagraph ? firstParagraph.textContent : body.textContent)[0] || '', date: Date.parse(card.dataset.date) || 0, rank: 0 };
  });
  function filterPosts() {
    var query = search ? search.value.trim().toLocaleLowerCase() : '';
    var terms = query.split(/\s+/).filter(Boolean);
    var shown = 0;
    var matched = [];
    entries.forEach(function (entry) {
      var card = entry.card;
      var tags = JSON.parse(card.dataset.tags || '[]');
      var categories = JSON.parse(card.dataset.categories || '[]');
      var titleMatch = includesAll(entry.title, terms);
      var bodyMatch = includesAll(entry.body, terms);
      var mode = scope ? scope.value : 'all';
      var matches = (!activeTag || tags.indexOf(activeTag) >= 0) && (!yearFilter || !yearFilter.value || yearFilter.value === card.dataset.year) && (!categoryFilter || !categoryFilter.value || categories.indexOf(categoryFilter.value) >= 0) && (!terms.length || (mode !== 'body' && titleMatch) || (mode !== 'title' && bodyMatch));
      entry.rank = titleMatch && mode !== 'body' ? 0 : 1;
      card.hidden = true;
      var badge = card.querySelector('.blog-match-type');
      badge.hidden = !query;
      badge.textContent = entry.rank === 0 ? '标题匹配' : '正文匹配';
      var snippet = entry.excerpt;
      if (query) snippet = entry.rank === 0 ? entry.description : (entry.sentences.find(function (sentence) { return includesAll(sentence, terms); }) || entry.sentences.find(function (sentence) { return terms.some(function (term) { return sentence.toLocaleLowerCase().indexOf(term) >= 0; }); }) || entry.first);
      highlight(entry.titleElement, entry.title, terms);
      highlight(entry.excerptElement, snippet, terms);
      if (matches) matched.push(entry);
    });
    matched.sort(function (a, b) { return b.date - a.date; });
    if (list) {
      entries.forEach(function (entry) { list.appendChild(entry.card); });
      list.querySelectorAll('.blog-year-heading,.blog-year-group').forEach(function (heading) { heading.remove(); });
    }
    var lastYear = '';
    var useGroups = list && list.dataset && list.dataset.yearGroups === 'true';
    var group = null;
    matched.forEach(function (entry, index) {
      if (!query && index < visibleLimit && entry.card.dataset.year !== lastYear) {
        var heading = document.createElement('h2');
        heading.className = 'blog-year-heading pt-4';
        heading.textContent = entry.card.dataset.year;
        heading.id = 'year-' + entry.card.dataset.year;
        list.appendChild(heading);
        lastYear = entry.card.dataset.year;
        group = null;
      }
      if (useGroups && index < visibleLimit) {
        if (!group) {
          group = document.createElement('div');
          group.className = 'blog-year-group my-0 p-0 bg-white shadow-sm rounded-xl';
          list.appendChild(group);
        }
        group.appendChild(entry.card);
      } else list.appendChild(entry.card);
      entry.card.hidden = index >= visibleLimit;
    });
    var yearNav = document.querySelector('#navbar-year');
    if (yearNav) {
      yearNav.hidden = !!query;
      yearNav.querySelectorAll('a').forEach(function (link) { link.hidden = !document.getElementById(link.hash.slice(1)); });
    }
    shown = matched.length;
    var empty = document.querySelector('.blog-no-results');
    if (empty) empty.hidden = shown > 0;
    if (more) more.hidden = shown <= visibleLimit;
    if (resultCount) resultCount.textContent = '共 ' + shown + ' 篇文章';
  }
  function resetFilters() { visibleLimit = 10; filterPosts(); }
  if (tagFilter) tagFilter.addEventListener('change', function () { activeTag = tagFilter.value; resetFilters(); });
  if (search) search.addEventListener('input', resetFilters);
  if (yearFilter) yearFilter.addEventListener('change', resetFilters);
  if (categoryFilter) categoryFilter.addEventListener('change', resetFilters);
  if (scope) scope.addEventListener('change', resetFilters);
  if (more) more.addEventListener('click', function () { visibleLimit += 10; filterPosts(); });
  if (list && typeof window !== 'undefined') {
    var requestedTag = new URLSearchParams(window.location.search).get('tag');
    if (requestedTag && tagFilter && Array.from(tagFilter.options).some(function (option) { return option.value === requestedTag; })) {
      activeTag = requestedTag;
      tagFilter.value = activeTag;
    }
  }
  filterPosts();
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
    var caption = image.alt.trim();
    if (image.parentElement.classList.contains('md-image')) return;
    var wrapper = document.createElement('span');
    wrapper.className = 'md-image';
    wrapper.setAttribute('alt', image.alt);
    if (!caption) wrapper.classList.add('md-image-no-caption');
    image.parentNode.insertBefore(wrapper, image);
    wrapper.appendChild(image);
  });
  content.querySelectorAll('sup[id^="fnref"]').forEach(function (note) { note.classList.add('md-footnote'); });
  content.querySelectorAll('li input[type="checkbox"]').forEach(function (input) {
    input.closest('li').classList.add('md-task-list-item');
  });
  content.querySelectorAll('a[href^="#"]').forEach(function (link) { link.target = '_self'; });
  var headings = Array.from(content.querySelectorAll('h2, h3, h4'));
  var toc = document.querySelector('.blog-toc');
  var links = [];
  var navbarHeight = 90;
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
      link.addEventListener('click', function (event) {
        event.preventDefault();
        // Same smooth-scroll and hash history as upstream; use document-relative
        // coordinates because the Typora wrapper changes the offset parent.
        window.scrollTo({
          top: heading.getBoundingClientRect().top + window.scrollY - navbarHeight,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
        history.pushState(null, null, link.getAttribute('href'));
      });
      (toc.querySelector('.blog-toc-list') || toc.querySelector('nav')).appendChild(link);
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
    headings.forEach(function (heading, index) { if (heading.getBoundingClientRect().top <= navbarHeight + 10) current = index; });
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
}());
