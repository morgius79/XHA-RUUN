#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(ROOT, 'docs', 'template.html'), 'utf-8');

function collectFiles(dir, base = '', skip = []) {
  let results = [];
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (skip.includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      const rel = base ? path.join(base, entry.name) : entry.name;
      if (entry.isDirectory()) results = results.concat(collectFiles(full, rel, skip));
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

function urlOf(rel) { return '/' + rel.replace(/index\.md$/, ''); }

const LANGS = {
  en: {
    src: path.join(ROOT, 'xharuun', 'en'),
    dest: path.join(ROOT, 'docs'),
    skip: [],
    htmlLang: 'en',
    altPrefix: '/ru',
    label: 'Русский',
    titleSuffix: ' — Xha\'Ruun Encyclopedia',
    navLabel: 'Encyclopedia',
    backLabel: 'Back to the Encyclopedia',
  },
  ru: {
    src: path.join(ROOT, 'xharuun'),
    dest: path.join(ROOT, 'docs', 'ru'),
    // Все Тома I–X публикуются (листинг глав — в xharuun/volume-*/index.md)
    skip: ['en', 'build', 'sharuun', 'scripts', 'templates', 'assets', 'xh'],
    htmlLang: 'ru',
    altPrefix: '',
    label: 'English',
    titleSuffix: ' — Энциклопедия Xha\'Ruun',
    navLabel: 'Энциклопедия',
    backLabel: 'Назад к энциклопедии',
  },
};

console.log('Building Xha\'Ruun site (en + ru)...');

const files = {};
for (const lang of Object.keys(LANGS)) {
  files[lang] = collectFiles(LANGS[lang].src, '', LANGS[lang].skip);
}
const sets = {};
for (const lang of Object.keys(LANGS)) sets[lang] = new Set(files[lang].map(f => f.relPath));

const assetsCopied = copyDir(path.join(ROOT, 'xharuun', 'en', 'assets'), path.join(ROOT, 'docs', 'assets'));
console.log(`Copied ${assetsCopied} asset file(s).`);

// registry/art → docs/registry/art (RU-главы ссылаются на ../../registry/art/...)
const registryCopied = copyDir(path.join(ROOT, 'registry', 'art'), path.join(ROOT, 'docs', 'registry', 'art'));
console.log(`Copied ${registryCopied} registry/art file(s).`);

let count = 0;
for (const lang of Object.keys(LANGS)) {
  const cfg = LANGS[lang];
  const other = lang === 'en' ? 'ru' : 'en';
  for (const { fullPath, relPath } of files[lang]) {
    try {
      const md = fs.readFileSync(fullPath, 'utf-8');
      const title = extractTitle(md);
      const body = marked.parse(md);
      const depth = relPath.split('/').length - 1;
      // RU-страницы собираются в docs/ru/... — на один уровень глубже,
      // поэтому CSS (docs/style.css) требует лишний '../'.
      // Ссылка «назад к энциклопедии» ведёт на свой язык: EN → docs/, RU → docs/ru/.
      const offset = lang === 'ru' ? 1 : 0;
      const styleDepth = depth + offset;
      const styleBase = styleDepth > 0 ? '../'.repeat(styleDepth) : './';
      const rootBase = depth > 0 ? '../'.repeat(depth) : './';

      // Переключатель языка — только если парная страница существует
      let langSwitch = '';
      if (sets[other].has(relPath)) {
        const href = cfg.altPrefix + urlOf(relPath);
        langSwitch = `<a class="lang" href="${href}">${cfg.label}</a>`;
      } else if (lang === 'en' && relPath === 'volume-1/index.md') {
        // EN-лендинг Тома I → RU-главная (Том I на RU — 40 корневых глав)
        langSwitch = `<a class="lang" href="/ru/">${cfg.label}</a>`;
      }

      const html = TEMPLATE
        .replace('{{title}}', title)
        .replace('{{titleSuffix}}', cfg.titleSuffix)
        .replace('{{breadcrumb}}', title)
        .replace('{{navLabel}}', cfg.navLabel)
        .replace('{{backLabel}}', cfg.backLabel)
        .replace(/\{\{base\}\}/g, styleBase)
        .replace(/\{\{rootBase\}\}/g, rootBase)
        .replace('{{htmlLang}}', cfg.htmlLang)
        .replace('{{langSwitch}}', langSwitch)
        .replace('{{content}}', body);
      const destPath = path.join(cfg.dest, relPath.replace('index.md', 'index.html'));
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, html, 'utf-8');
      count++;
    } catch (e) {
      console.error(`  ERROR ${lang}/${relPath}: ${e.message}`);
    }
  }
}
console.log(`Done. ${count} pages generated.`);
