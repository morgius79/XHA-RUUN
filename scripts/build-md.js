const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const xharuun = path.join(root, 'xharuun');
const output = path.join(xharuun, 'build', 'full-encyclopedia.md');

const preface = `# Xha'Ruun: Энциклопедия цивилизации

**Том I: Вселенная**

Версия v0.5.0 (Release Candidate) · Сборка: ${new Date().toLocaleDateString('ru-RU')}

---

<div style='page-break-before: always;'></div>

## Предисловие

Эта книга — плод многолетнего (по меркам её собственного мира) труда Гильдии Естественной Истории: полный обзор планеты Théxar, звёздной системы Khar'Vex и трёх разумных видов, разделивших между собой сушу, недра и глубины единственной известной обитаемой планеты этой системы.

Том I задуман как введение в целое: здесь по одному разу говорится обо всём — от фундаментальных констант вселенной до последнего из трёх видов, вступивших в Совет Единства. Последующие тома (II-X) разворачивают отдельные нити этого обзора в глубину: историю, общество, язык, культуру, технологии и природу Théxar.

Как и любой труд такого масштаба, он не свободен от шероховатостей — часть из них зафиксирована и сознательно оставлена как «мягкий канон» (см. PROJECT_CONTEXT.md §11.6) до централизованной правки. Это не помешает чтению, но добросовестность требует не скрывать это от читателя.

---

<div style='page-break-before: always;'></div>

## Оглавление

`;

const chapterFiles = [
    'CANON.md',
    '01-universe-spec/index.md',
    '02-star-system/index.md',
    '03-planet-thexar/index.md',
    '04-biochemistry/index.md',
    '05-species-xharuun/index.md',
    '06-language/index.md',
    '07-history/index.md',
    '08-culture/index.md',
    '09-technology/index.md',
    '10-mythology/index.md',
    '11-ecology/index.md',
    '12-geological-evolution/index.md',
    '13-continents/index.md',
    '14-hydrosphere/index.md',
    '15-atmosphere-climate/index.md',
    '16-magnetosphere/index.md',
    '17-flora/index.md',
    '18-fauna/index.md',
    '19-resources/index.md',
    '20-origin-of-life/index.md',
    '21-ecosystems/index.md',
    '22-hydrology/index.md',
    '23-cryosphere/index.md',
    '24-satellites/index.md',
    '25-night-sky/index.md',
    '26-conclusion/index.md',
    '27-geodesy/index.md',
    '28-exploration-history/index.md',
    '29-climate-history/index.md',
    '30-planet-in-numbers/index.md',
    '31-future/index.md',
    '32-kharvex-system/index.md',
    '33-fusion-energy/index.md',
    '34-measurement/index.md',
    '35-index/index.md',
    '36-geochemistry/index.md',
    '37-ecological-zones/index.md',
    '38-kelvash-species/index.md',
    '39-moryn-species/index.md',
    '40-three-species-accord/index.md'
];

const appendixFiles = [
    'appendices/timeline.md',
    'appendices/glossary.md',
    'appendices/names.md',
    'appendices/physical-reference.md',
    'appendices/biological-reference.md',
    'appendices/index.md'
];

// Build TOC
let toc = '';
const tocEntries = [];
for (const f of chapterFiles.slice(1)) { // skip CANON.md
    const fp = path.join(xharuun, f);
    if (!fs.existsSync(fp)) continue;
    const firstLine = fs.readFileSync(fp, 'utf-8').split('\n')[0];
    const title = firstLine.replace(/^#\s*/, '').trim();
    tocEntries.push(title);
    toc += `${tocEntries.length}. ${title}\n`;
}

let outputContent = preface + toc + '\n\n---\n\n<div style=\'page-break-before: always;\'></div>\n\n';

// Append all files
const allFiles = chapterFiles.concat(appendixFiles);
let fileCount = 0, totalLines = 0;

for (const relPath of allFiles) {
    const fp = path.join(xharuun, relPath);
    if (!fs.existsSync(fp)) {
        console.log(`  NOT FOUND: ${relPath}`);
        outputContent += `\n<!-- MISSING: ${relPath} -->\n`;
        continue;
    }
    const content = fs.readFileSync(fp, 'utf-8');
    const lines = content.split('\n').length;
    fileCount++;
    totalLines += lines;
    outputContent += content + '\n\n<div style=\'page-break-before: always;\'></div>\n\n';
    console.log(`  + ${relPath} (${lines} lines)`);
}

fs.writeFileSync(output, outputContent, 'utf-8');
console.log(`\nDone: ${fileCount} files, ${totalLines} lines => ${output}`);
console.log(`Size: ${(fs.statSync(output).size / 1024).toFixed(0)} KB`);
