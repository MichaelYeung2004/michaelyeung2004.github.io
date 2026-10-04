# Local Typora dyzj-light snapshot

`dyzj-light.css`, `source/dyzj.css`, the icon font and the font resources were copied verbatim from the user's installed Typora theme. `source-manifest.json` records their SHA-256 hashes. All original comments and resource contents are retained.

`tools/sync-typora-theme.mjs` generates `assets/css/dyzj-light-web.css` from these files, preserving declarations and keyframes. Its only transformations are removing imports for explicit loading, isolating CSS in the article, mapping the editor's root/body/content elements onto webpage containers, and resolving the background image path.

`assets/css/typora-bridge.css` and `assets/js/blog.js` provide DOM compatibility for Jekyll code blocks, images, lists and footnotes. They do not replace the original theme palette or typography scale. Native Typora editor controls are not part of the webpage.
