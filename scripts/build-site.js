#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'xharuun', 'en');
const DEST = path.join(ROOT, 'docs');
const TEMPLATE = fs.readFileSync(path.join(DEST, 'template.html'), 'utf-8');

function collectFiles(dir, base = '') {
  let results = [];
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = base ? path.join(base, entry.name) : entry.name;
      if (entry.isDirectory()) results = results.concat(collectFiles(full, rel));
      else if (entry.isFile() && entry.name === 'index.md')
        results.push({ fullPath: full, relPath: rel.replace(/\\/g, '/') });
    }
  } catch (_) {}
  return results;
}

function extractTitle(content) {
  const m = content.match(/^# (.+)$/m);
  return m ? m[1].replace(/\*\*/g, '').trim() : 'Chapter';
}

console.log('Building Xha\'Ruun site...');

// Copy static assets (illustrations etc.) verbatim
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return 0;
  let copied = 0;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copied += copyDir(s, d);
    else { fs.copyFileSync(s, d); copied++; }
  }
  return copied;
}
const assetsCopied = copyDir(path.join(SRC, 'assets'), path.join(DEST, 'assets'));
console.log(`Copied ${assetsCopied} asset file(s).`);

const files = collectFiles(SRC);
let count = 0;

for (const { fullPath, relPath } of files) {
  try {
    const md = fs.readFileSync(fullPath, 'utf-8');
    const title = extractTitle(md);
    const body = marked.parse(md);
    const depth = relPath.split('/').length - 1;
    const base = depth > 0 ? '../'.repeat(depth) : './';
    const html = TEMPLATE
      .replace('{{title}}', title)
      .replace('{{breadcrumb}}', title)
      .replace(/\{\{base\}\}/g, base)
      .replace('{{content}}', body);
    const destPath = path.join(DEST, relPath.replace('index.md', 'index.html'));
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, html, 'utf-8');
    count++;
  } catch (e) {
    console.error(`  ERROR: ${relPath}: ${e.message}`);
  }
}

console.log(`Done. ${count} pages generated.`);
