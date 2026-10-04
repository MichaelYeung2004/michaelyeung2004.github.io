// Copy the requested local theme verbatim and isolate its rules for web use.
// Run: node tools/sync-typora-theme.mjs "C:/.../Typora/themes"
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const source = path.resolve(process.argv[2]);
const destination = path.resolve('assets/vendor/dyzj-light');
const files = ['dyzj-light.css', 'source/dyzj.css'];
for (const folder of ['source/dy', 'source/zj']) {
  for (const entry of fs.readdirSync(path.join(source, folder), {withFileTypes: true})) {
    if (entry.isFile()) files.push(`${folder}/${entry.name}`);
  }
}
if (fs.existsSync(path.join(source, 'source/bg-light.gif'))) files.push('source/bg-light.gif');
const hashes = {};
for (const file of files) {
  const buffer = fs.readFileSync(path.join(source, file));
  const target = path.join(destination, file);
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.copyFileSync(path.join(source, file), target);
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  const copiedHash = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex');
  if (hash !== copiedHash) throw new Error(`Copy mismatch: ${file}`);
  hashes[file] = hash;
}
// The light theme references ./bg-light.gif at its own level.
if (fs.existsSync(path.join(destination, 'source/bg-light.gif'))) {
  fs.copyFileSync(path.join(destination, 'source/bg-light.gif'), path.join(destination, 'bg-light.gif'));
}
const originalBase = fs.readFileSync(path.join(destination, 'source/dyzj.css'), 'utf8');
const originalLight = fs.readFileSync(path.join(destination, 'dyzj-light.css'), 'utf8');
// @imports must be outside @scope. All declarations, values and keyframes remain unchanged.
function scope(text) {
  return text.replace(/^@import[^;]+;\s*/gm, '')
    .replace(/:root/g, ':scope')
    .replace(/(?<![-\w])(?:html|body)(?![-\w])/g, ':scope')
    .replace(/(?<![-\w])content(?=\s*[\{#])/g, '.typora-content')
    .replace('url(./bg-light.gif)', "url('../vendor/dyzj-light/bg-light.gif')");
}
const web = `/* Generated from byte-identical local dyzj-light sources. Do not edit. */
@import url('../vendor/dyzj-light/source/dy/iconfont.min.css');
@import url('../vendor/dyzj-light/source/zj/fonts.css');
/* Keep original rem sizing even though the theme is isolated to the article. */
html:has(.typora-reader) { font-size: 17px; }
@scope (.typora-reader) {
${scope(originalBase)}
${scope(originalLight)}
}
`;
fs.writeFileSync('assets/css/dyzj-light-web.css', web);
fs.writeFileSync(path.join(destination, 'source-manifest.json'), JSON.stringify({
  description: 'SHA-256 of the unmodified local theme files; web CSS changes selectors only.', files: hashes
}, null, 2) + '\n');
console.log(`Verified ${files.length} byte-identical files; generated scoped stylesheet.`);
