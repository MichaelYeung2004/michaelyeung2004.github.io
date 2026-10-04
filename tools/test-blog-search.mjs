import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
function node(text = '') {
  return { textContent: text, hidden: false, children: [], replaceChildren() { this.children = []; }, appendChild(child) { this.children.push(child); }, addEventListener() {} };
}
function card(title, body, date) {
  const nodes = { '.blog-card-title a': node(title), '.blog-excerpt': node('default summary'), '.blog-match-type': node() };
  nodes['.blog-search-body'] = { content: { cloneNode() { return { textContent: body, querySelectorAll(selector) { return selector === 'script,style' ? [] : [node(body)]; }, querySelector() { return node(body); } }; } } };
  return { dataset: { tags: '[]', categories: '[]', date, year: '2026' }, nodes, querySelector(selector) { return nodes[selector]; } };
}
const cards = [card('Alpha old', 'Opening sentence. Next sentence.', '2026-01-01'), card('Other new', 'Opening sentence. Alpha appears here.', '2026-09-01'), card('Alpha new', 'First sentence. More text.', '2026-08-01')];
cards[2].dataset.description = 'The full description, not the opening sentence.';
const search = { value: 'Alpha', addEventListener() {} };
const scope = { value: 'all', addEventListener() {} };
const list = { order: [], querySelectorAll() { return []; }, appendChild(item) { this.order.push(item); } };
const elements = { '.blog-search input': search, '[data-search-scope]': scope, '.blog-post-list': list };
const document = {
  querySelectorAll(selector) { return selector === '.blog-card' ? cards : []; },
  querySelector(selector) { return elements[selector] || null; },
  createTextNode: node, createElement: () => node()
};
function run(query, range = 'all') {
  search.value = query; scope.value = range; list.order = [];
  vm.runInNewContext(fs.readFileSync('assets/js/blog.js', 'utf8'), { document, Intl });
  return list.order.filter(item => cards.includes(item));
}
assert.deepEqual(run('Alpha'), [cards[2], cards[0], cards[1]], 'Title first, descending dates within each match type');
assert.equal(cards[2].nodes['.blog-excerpt'].children.map(n => n.textContent).join(''), 'The full description, not the opening sentence.');
assert.equal(cards[1].nodes['.blog-excerpt'].children.map(n => n.textContent).join(''), 'Alpha appears here.');
assert.equal(cards[1].nodes['.blog-excerpt'].children.some(n => n.textContent === 'Alpha'), true);
assert.deepEqual(run('Alpha', 'title'), [cards[2], cards[0]]);
assert.deepEqual(run('Alpha', 'body'), [cards[1]]);
assert.deepEqual(run(''), [cards[1], cards[2], cards[0]]);
assert.deepEqual(run('no-such-term'), []);
assert.deepEqual(run('Alpha appears'), [cards[1]]);
console.log('PASS: title/body scopes, ranking, dates, sentence snippets, highlighting and no results');
