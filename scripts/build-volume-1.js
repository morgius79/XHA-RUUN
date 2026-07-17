const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const path = require('path');

const VOLUME_DIR = path.resolve(__dirname, '..', 'volumes', 'volume-1');
const BUILD_DIR = path.resolve(__dirname, '..', 'volumes', 'build');

// Ensure build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Ordered files for Volume I
const files = [
  // Title and TOC
  'index.md',

  // Part 1: Cosmology
  'part-1-cosmology/001-universe-origin.md',
  'part-1-cosmology/002-fundamental-forces.md',
  'part-1-cosmology/003-cosmic-structure.md',
  'part-1-cosmology/004-dark-matter-energy.md',
  'part-1-cosmology/005-limits-of-physics.md',

  // Part 2: Star System
  'part-2-star-system/006-star-kharvex.md',
  'part-2-star-system/007-planetary-system.md',
  'part-2-star-system/008-inner-planets.md',
  'part-2-star-system/009-asteroid-belt.md',
  'part-2-star-system/010-outer-planets.md',
  'part-2-star-system/011-heliosphere.md',

  // Part 3: Planet Théxar
  'part-3-planet-thexar/012-geological-evolution.md',
  'part-3-planet-thexar/013-atmosphere.md',
  'part-3-planet-thexar/014-hydrosphere.md',
  'part-3-planet-thexar/015-continents.md',
  'part-3-planet-thexar/016-magnetosphere.md',
  'part-3-planet-thexar/017-resources.md',

  // Part 4: Life on Théxar
  'part-4-life-on-thexar/018-biochemical-foundations.md',
  'part-4-life-on-thexar/019-genetic-code.md',
  'part-4-life-on-thexar/020-metabolism.md',
  'part-4-life-on-thexar/021-origin-of-life.md',
  'part-4-life-on-thexar/022-ecology-overview.md',

  // Appendices
  'appendices/A-physical-constants.md',
  'appendices/B-star-system-data.md',
  'appendices/C-planetary-profile.md',
  'appendices/D-timeline.md',
  'appendices/E-glossary.md',
];

// Concatenate all files with page breaks
let combined = `# Том I: Вселенная

**Энциклопедия цивилизации Xha'Ruun**

---

*Сборка: ${new Date().toISOString().split('T')[0]}*
*Версия: v0.3.0 (черновик)*

---

<div style="page-break-after: always;"></div>

`;

for (const f of files) {
  const filePath = path.join(VOLUME_DIR, f);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ File not found: ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  combined += content;
  combined += '\n\n<div style="page-break-after: always;"></div>\n\n';
  console.log(`✓ Added: ${f}`);
}

const combinedPath = path.join(BUILD_DIR, 'volume-1-full.md');
fs.writeFileSync(combinedPath, combined, 'utf-8');
console.log(`\n✓ Combined MD written to: ${combinedPath}`);
console.log(`  Size: ${(combined.length / 1024).toFixed(0)} KB`);

// Convert to PDF
async function buildPdf() {
  try {
    const pdf = await mdToPdf(
      { path: combinedPath },
      {
        pdf_options: {
          format: 'A5',
          margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
          printBackground: true,
        },
        stylesheet: [path.resolve(__dirname, '..', 'xharuun', 'templates', 'print.css')],
        body_class: ['volume-print'],
      }
    );

    const pdfPath = path.join(BUILD_DIR, 'Volume-I-Universe.pdf');
    fs.writeFileSync(pdfPath, pdf.content);
    console.log(`\n✓ PDF written to: ${pdfPath}`);
    console.log(`  Size: ${(pdf.content.length / 1024).toFixed(0)} KB`);
  } catch (err) {
    console.error(`\n⚠ PDF generation failed: ${err.message}`);
    console.log('  The combined MD file is still available for manual conversion.');
  }
}

buildPdf();
