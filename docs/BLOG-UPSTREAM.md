# Blog upstream

Source: https://github.com/luost26/academic-homepage (main, imported 2026-10-04).

- `assets/css/luost-global.css`: original global CSS, unchanged.
- `assets/css/luost-blog-layout.css`: original layout/TOC section from upstream blog.css, unchanged. Its Markdown typography section is deliberately not loaded, to retain the user's dyzj-light theme.
- `_includes/luost/navbar.html` and `footer.html`: upstream components, with data namespaces and the brand link adapted to this site.
- `_includes/luost/blog_card.html`: upstream card markup with search attributes, description snippets and clickable tags added.
- Blog index and article layouts use the upstream Bootstrap structure. Existing search behavior and Typora content are preserved.
- `assets/css/luost-LICENSE.txt`: upstream MIT license.

The personal homepage's body layout and stylesheet remain independent. Its navbar reuses the upstream component with isolated Bootstrap-equivalent sizing. Publications retains the upstream year-group layout and year navigation, but each paper shares `_includes/publication-card.html` and `_sass/_publication-cards.scss` with the homepage. The standalone page does not collapse. Images remain eagerly loaded with progressive full-resolution replacement. The footer's last-updated text is omitted site-wide.
