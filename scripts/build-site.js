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

// Корневые пути языков относительно EN-корня (docs/). Используются для
// переключателей языков: href = LOCATIONS[target] + urlOf(relPath).
const LOCATIONS = { en: '', ru: '/ru', xh: '/xh' };

const LANGS = {
  en: {
    src: path.join(ROOT, 'xharuun', 'en'),
    dest: path.join(ROOT, 'docs'),
    skip: [],
    htmlLang: 'en',
    selfName: 'English',
    titleSuffix: ' — Xha\'Ruun Encyclopedia',
    navLabel: 'Encyclopedia',
    backLabel: 'Back to the Encyclopedia',
  },
  ru: {
    src: path.join(ROOT, 'xharuun'),
    dest: path.join(ROOT, 'docs', 'ru'),
    // Все Тома I–X публикуются (листинг глав — в xharuun/volume-*/index.md);
    // en/, xh/ — отдельные языковые версии.
    skip: ['en', 'build', 'sharuun', 'scripts', 'templates', 'assets', 'xh'],
    htmlLang: 'ru',
    selfName: 'Русский',
    titleSuffix: ' — Энциклопедия Xha\'Ruun',
    navLabel: 'Энциклопедия',
    backLabel: 'Назад к энциклопедии',
  },
  xh: {
    src: path.join(ROOT, 'xharuun', 'xh'),
    dest: path.join(ROOT, 'docs', 'xh'),
    skip: [],
    htmlLang: 'xh',
    selfName: 'Xha\'Ruun',
    titleSuffix: ' — Ven-Khal-Vokh',
    navLabel: 'Ven-Khal-Vokh',
    backLabel: 'Rhu ven-khal-vokh',
  },
};

console.log('Building Xha\'Ruun site (en + ru + xh)...');

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
      // RU и XH собираются в docs/ru/, docs/xh/ — на один уровень глубже, чем EN,
      // поэтому CSS (docs/style.css) требует лишний '../'.
      // Ссылка «назад к энциклопедии» ведёт на свой язык: EN → docs/, RU → docs/ru/, XH → docs/xh/.
      const offset = (lang === 'ru' || lang === 'xh') ? 1 : 0;
      const styleDepth = depth + offset;
      const styleBase = styleDepth > 0 ? '../'.repeat(styleDepth) : './';
      const rootBase = depth > 0 ? '../'.repeat(depth) : './';

      // Переключатели языков — ссылки на все остальные языки, где есть парная страница
      const switches = [];
      for (const other of Object.keys(LANGS)) {
        if (other === lang) continue;
        if (sets[other].has(relPath)) {
          const href = LOCATIONS[other] + urlOf(relPath);
          switches.push(`<a class="lang" href="${href}">${LANGS[other].selfName}</a>`);
        }
      }
      // Спецслучай: EN-лендинг Тома I → RU-главная (Том I на RU — 40 корневых глав)
      if (lang === 'en' && relPath === 'volume-1/index.md' && sets.ru.size > 0) {
        switches.unshift(`<a class="lang" href="/ru/">${LANGS.ru.selfName}</a>`);
      }
      const langSwitch = switches.join('');

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
