(function () {
  'use strict';
  var script = document.currentScript;
  var manifestUrl = script && script.getAttribute('data-image-manifest');
  if (!manifestUrl || !window.fetch) return;
  var queue = [];
  var seen = new Set();
  var loaded = false;
  var busy = false;
  var scheduled = false;
  var activeImage = null;
  var pageLoaded = document.readyState === 'complete';

  function allowed() {
    var connection = navigator.connection;
    return document.visibilityState !== 'hidden' && navigator.onLine !== false &&
      !(connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || '')));
  }
  function normalize(source, base) {
    if (typeof source !== 'string' || !source.trim()) return null;
    try {
      var url = new URL(source.replace(/&amp;/g, '&'), new URL(base || '/', location.origin));
      // Do not contact third-party hosts speculatively or preload inline data.
      return url.origin === location.origin && /^https?:$/.test(url.protocol) ? url.href : null;
    } catch (_) { return null; }
  }
  function schedule() {
    if (!pageLoaded || scheduled || busy || !allowed() || (loaded && !queue.length)) return;
    scheduled = true;
    var run = function () { scheduled = false; if (allowed()) step(); };
    if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 4000 });
    else window.setTimeout(run, 750);
  }
  function step() {
    if (busy) return;
    busy = true;
    if (!loaded) {
      fetch(manifestUrl, { cache: 'force-cache', priority: 'low' })
        .then(function (response) { if (!response.ok) throw new Error('manifest'); return response.json(); })
        .then(function (items) {
          performance.getEntriesByType('resource').forEach(function (entry) { seen.add(entry.name); });
          items.forEach(function (item) {
            var url = item && normalize(item.src, item.page);
            if (url && !seen.has(url)) { seen.add(url); queue.push(url); }
          });
        })
        .catch(function () { /* A failed warm-up must never affect the page. */ })
        .then(function () { loaded = true; busy = false; schedule(); });
      return;
    }
    var source = queue.shift();
    if (!source) { busy = false; return; }
    // One low-priority request at a time; ordinary HTTP caching is shared with
    // subsequent img and CSS requests, without service workers or stale caches.
    activeImage = new Image();
    activeImage.decoding = 'async';
    activeImage.fetchPriority = 'low';
    activeImage.onload = activeImage.onerror = function () {
      activeImage = null; busy = false; schedule();
    };
    activeImage.src = source;
  }
  document.addEventListener('visibilitychange', schedule);
  window.addEventListener('online', schedule);
  if (navigator.connection && navigator.connection.addEventListener) navigator.connection.addEventListener('change', schedule);
  if (pageLoaded) schedule();
  else window.addEventListener('load', function () { pageLoaded = true; schedule(); }, { once: true });
}());
