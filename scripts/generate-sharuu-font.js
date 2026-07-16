// generate-sharuu-font.js
// Generates Sha'Ruun SVG font with full syllabary + logograms + numerals
// Usage: node scripts/generate-sharuu-font.js

const fs = require('fs');
const path = require('path');

// Unicode PUA ranges for Sha'Ruun:
// U+E000-E005 : Numerals (base-6: 0-5)
// U+E100-E1FF : Syllabary (V: 8, CV: ~100, CCV: ~16)
// U+E200-E22F : Logograms (48)
// U+E300-E3xx : Punctuation marks

const ROOT = path.join(__dirname, '..');
const FONT_DIR = path.join(ROOT, 'xharuun', 'build', 'font');
const FONT_NAME = 'ShaRuun';
const UNITS_PER_EM = 1000;

// ============================================================
// GLYPH DESIGN FUNCTIONS
// ============================================================

// Generate SVG path for a glyph using simple primitives
// All coordinates in em-space (1000 × 1000)
function wedge(w, h, dir = 'right') {
    if (dir === 'right') {
        return `M 0,${500-h/2} L ${w},500 L 0,${500+h/2} Z`;
    }
    return `M ${w},${500-h/2} L 0,500 L ${w},${500+h/2} Z`;
}

function chevron(w, h) {
    return `M 0,${500-h/2} L ${w/2},500 L 0,${500+h/2} M ${w/2},${500-h/2} L ${w},500 L ${w/2},${500+h/2}`;
}

function diamond(w, h) {
    return `M ${w/2},${500-h/2} L ${w},500 L ${w/2},${500+h/2} L 0,500 Z`;
}

function circle(radius) {
    const r = radius;
    return `M ${500},${500-r} A ${r},${r} 0 1,1 ${500},${500+r} A ${r},${r} 0 1,1 ${500},${500-r} Z`;
}

function hexagon(size) {
    const s = size;
    const dx = s * 0.866; // cos(30)
    const dy = s * 0.5;
    return `M ${500},${500-s} L ${500+dx},${500-dy} L ${500+dx},${500+dy} L ${500},${500+s} L ${500-dx},${500+dy} L ${500-dx},${500-dy} Z`;
}

function line(x1, y1, x2, y2, stroke = 2) {
    return `M ${x1},${y1} L ${x2},${y2}`;
}

function cross(w, h) {
    return `M ${500-w/2},${500-h/2} L ${500+w/2},${500+h/2} M ${500+w/2},${500-h/2} L ${500-w/2},${500+h/2}`;
}

function triangle(w, h, dir = 'up') {
    if (dir === 'up') {
        return `M ${500-w/2},${500+h/2} L ${500},${500-h/2} L ${500+w/2},${500+h/2} Z`;
    }
    return `M ${500-w/2},${500-h/2} L ${500},${500+h/2} L ${500+w/2},${500-h/2} Z`;
}

// ============================================================
// GLYPH DEFINITIONS
// ============================================================

const glyphs = {};

// --- Numerals (base-6) ---
// 0: empty circle, 1: dot, 2: two dots, 3: triangle, 4: square, 5: pentagram
glyphs['num_0'] = { unicode: 'U+E000', name: 'SHARUUN_NUM_0', d: circle(120), desc: 'ShaRuun numeral 0' };
glyphs['num_1'] = { unicode: 'U+E001', name: 'SHARUUN_NUM_1', d: circle(60), desc: 'ShaRuun numeral 1' };
glyphs['num_2'] = { unicode: 'U+E002', name: 'SHARUUN_NUM_2', d: [
    'M 420,420 A 40,40 0 1,1 420,419',
    'M 580,580 A 40,40 0 1,1 580,579'
].join(' '), desc: 'ShaRuun numeral 2' };
glyphs['num_3'] = { unicode: 'U+E003', name: 'SHARUUN_NUM_3', d: triangle(180, 160, 'up'), desc: 'ShaRuun numeral 3' };
glyphs['num_4'] = { unicode: 'U+E004', name: 'SHARUUN_NUM_4', d: `M 380,380 L 620,380 L 620,620 L 380,620 Z`, desc: 'ShaRuun numeral 4' };
glyphs['num_5'] = { unicode: 'U+E005', name: 'SHARUUN_NUM_5', d: hexagon(120), desc: 'ShaRuun numeral 5' };

// --- Vowels (8) ---
// a: short wedge right, e: wedge left, i: wedge up, o: wedge down
// u: chevron up, ə: chevron down, iː: wedge up double, uː: wedge down double
glyphs['v_a'] = { unicode: 'U+E100', name: 'SHARUUN_V_A', d: wedge(140, 100, 'right'), desc: 'ShaRuun vowel a' };
glyphs['v_e'] = { unicode: 'U+E101', name: 'SHARUUN_V_E', d: wedge(140, 100, 'left'), desc: 'ShaRuun vowel e' };
glyphs['v_i'] = { unicode: 'U+E102', name: 'SHARUUN_V_I', d: triangle(100, 140, 'up'), desc: 'ShaRuun vowel i' };
glyphs['v_o'] = { unicode: 'U+E103', name: 'SHARUUN_V_O', d: triangle(100, 140, 'down'), desc: 'ShaRuun vowel o' };
glyphs['v_u'] = { unicode: 'U+E104', name: 'SHARUUN_V_U', d: chevron(120, 80), desc: 'ShaRuun vowel u' };
glyphs['v_e_schwa'] = { unicode: 'U+E105', name: 'SHARUUN_V_SCHWA', d: [
    `M 400,500 L 600,500`,
    `M 500,400 L 500,600`
].join(' '), desc: 'ShaRuun vowel ə' };
glyphs['v_ii'] = { unicode: 'U+E106', name: 'SHARUUN_V_II', d: [
    triangle(80, 120, 'up'),
    `M 550,380 L 550,620`
].join(' '), desc: 'ShaRuun vowel iː' };
glyphs['v_uu'] = { unicode: 'U+E107', name: 'SHARUUN_V_UU', d: [
    triangle(80, 120, 'down'),
    `M 550,380 L 550,620`
].join(' '), desc: 'ShaRuun vowel uː' };

// --- CV Syllabary (key signs, ~30 representative glyphs) ---
// Format: consonant + vowel modification
// Consonants: k, kh, g, t, th, d, r, l, n, sh, s, z, m, v, ', ts, ch, p, b, f, h, w, j, ŋ

const consonants = {
    'k':  { base: 'M 300,400 L 450,300 L 600,400 L 450,500 Z' },
    'kh': { base: 'M 300,400 L 450,300 L 600,400 L 450,500 Z M 450,300 L 450,500' },
    'g':  { base: 'M 300,300 L 500,300 L 600,400 L 500,500 L 300,500 Z' },
    't':  { base: 'M 350,300 L 650,350 L 550,500 L 350,500 Z' },
    'th': { base: 'M 350,300 L 650,350 L 550,500 L 350,500 Z M 400,380 L 580,380' },
    'd':  { base: 'M 350,300 L 600,350 L 550,500 L 300,500 Z' },
    'r':  { base: 'M 450,300 L 600,350 L 500,500 L 400,500 Z M 450,300 L 350,400' },
    'l':  { base: 'M 400,300 L 600,300 L 600,500 L 400,500 Z' },
    'n':  { base: 'M 400,300 L 550,350 L 550,550 L 400,500 Z M 400,300 L 400,500' },
    'sh': { base: 'M 350,300 L 600,300 L 500,400 L 600,500 L 350,500 L 450,400 Z' },
    's':  { base: 'M 400,300 L 600,350 L 550,450 L 600,550 L 400,500 Z' },
    'z':  { base: 'M 400,300 L 600,350 L 550,450 L 600,550 L 400,500 Z M 400,300 L 450,450 L 400,500' },
    'm':  { base: 'M 350,300 L 650,300 L 550,450 L 650,600 L 350,600 Z' },
    'v':  { base: 'M 400,300 L 550,400 L 400,500 L 550,600' },
    '\'': { base: 'M 450,300 L 550,350 L 500,450 L 550,550 L 450,600' },
    'p':  { base: 'M 350,300 L 650,300 L 600,400 L 650,500 L 350,500 Z' },
    'b':  { base: 'M 350,300 L 650,300 L 600,400 L 650,500 L 350,500 Z M 350,300 L 350,500' },
    'f':  { base: 'M 400,300 L 550,300 L 550,500 L 400,500 Z M 400,300 L 300,400 L 400,500' },
    'h':  { base: 'M 400,300 L 600,400 L 400,500 M 350,350 L 550,450 L 350,550' },
    'w':  { base: 'M 350,350 Q 500,250 650,350 Q 500,450 350,350' },
    'j':  { base: 'M 350,300 L 500,300 Q 600,400 500,500 L 350,500' },
    'ŋ':  { base: 'M 400,300 L 600,350 L 650,450 L 600,550 L 400,500 Z M 400,300 L 400,500' },
    'ts': { base: 'M 350,300 L 550,350 L 450,450 L 550,550 L 350,500 M 600,350 L 650,450 L 600,550' },
    'ch': { base: 'M 350,300 L 650,300 L 500,400 L 650,500 L 350,500 M 500,400 L 500,550' },
};

// Vowel modifiers for CV syllables
function vowelMod(vowel, xOffset = 0, yOffset = 0) {
    const ox = 200 + xOffset;
    const oy = 200 + yOffset;
    const mods = {
        'a': `M ${ox},${oy} L ${ox+80},${oy+40} L ${ox},${oy+80} Z`,
        'e': `M ${ox+80},${oy} L ${ox},${oy+40} L ${ox+80},${oy+80} Z`,
        'i': `M ${ox},${oy+80} L ${ox+40},${oy} L ${ox+80},${oy+80} Z`,
        'o': `M ${ox},${oy} L ${ox+40},${oy+80} L ${ox+80},${oy} Z`,
        'u': `M ${ox},${oy+40} L ${ox+40},${oy} L ${ox+80},${oy+40} L ${ox+40},${oy+80} Z`,
        'ə': `M ${ox},${oy+40} L ${ox+80},${oy+40}`,
    };
    return mods[vowel] || mods['a'];
}

let cvCode = 0xE110;
for (const [cname, cdata] of Object.entries(consonants)) {
    for (const v of ['a', 'e', 'i', 'o', 'u', 'ə']) {
        const hex = cvCode.toString(16).toUpperCase().padStart(4, '0');
        const vm = vowelMod(v);
        // Position vowel mod at bottom-right of consonant
        const vmShifted = vm.replace(/M \d+/g, (m) => {
            const n = parseInt(m.split(' ')[1]) + 200;
            return `M ${n}`;
        }).replace(/(\d+),/g, (_, n) => `${parseInt(n) + 200},`);

        const d = cdata.base + ' ' + (
            v === 'a' ? '' : // a is inherent
            vmShifted
        );

        const key = `cv_${cname}_${v}`;
        glyphs[key] = {
            unicode: `U+${hex}`,
            name: `SHARUUN_CV_${cname.toUpperCase()}_${v.toUpperCase()}`,
            d: d.trim(),
            desc: `ShaRuun syllable ${cname}${v}`
        };
        cvCode++;
    }
}

// --- Logograms (48, I'll create 12 core ones with full detail) ---
const logograms = {
    'vokh': { desc: 'вселенная, мир', code: 0xE200,
        d: hexagon(180) + ' ' + circle(60) },
    'khar': { desc: 'свет, звезда', code: 0xE201,
        d: [
            hexagon(120),
            `M 500,320 L 500,680 M 320,500 L 680,500`,
            `M 380,380 L 620,620 M 620,380 L 380,620`
        ].join(' ') },
    'the': { desc: 'земля, планета', code: 0xE202,
        d: [
            circle(160),
            cross(240, 240)
        ].join(' ') },
    'xa': { desc: 'жизнь, живое', code: 0xE203,
        d: [
            triangle(200, 180, 'up'),
            `M 500,380 L 500,620`,
            `M 380,500 L 620,500`
        ].join(' ') },
    'xha': { desc: 'мысль, разум', code: 0xE204,
        d: [
            triangle(200, 180, 'up'),
            triangle(140, 120, 'down'),
            cross(100, 100)
        ].join(' ') },
    'ruun': { desc: 'народ', code: 0xE205,
        d: [
            circle(180),
            circle(80),
            `M 400,500 L 600,500`
        ].join(' ') },
    'ven': { desc: 'истина, знание', code: 0xE206,
        d: [
            `M 350,650 L 500,350 L 650,650 Z`,
            `M 500,350 L 500,200`
        ].join(' ') },
    'mor': { desc: 'время', code: 0xE207,
        d: [
            chevron(200, 160),
            `M 400,500 L 600,500`,
            wedge(80, 60, 'right')
        ].join(' ') },
    'rass': { desc: 'единство, гармония', code: 0xE208,
        d: [
            circle(180),
            hexagon(100),
            diamond(60, 60)
        ].join(' ') },
    'thar': { desc: 'сила, энергия', code: 0xE209,
        d: [
            `M 350,350 L 650,350 L 500,650 Z`,
            `M 500,350 L 500,650`,
            `M 380,500 L 620,500`
        ].join(' ') },
    'sha': { desc: 'язык, слово', code: 0xE20A,
        d: [
            `M 350,350 L 650,350 L 650,650 L 350,650 Z`,
            chevron(100, 60),
            `M 350,500 L 650,500`
        ].join(' ') },
    'nur': { desc: 'рождение, смерть', code: 0xE20B,
        d: [
            circle(180),
            hexagon(80),
            cross(100, 100),
            diamond(40, 40)
        ].join(' ') },
};

for (const [name, data] of Object.entries(logograms)) {
    glyphs[`log_${name}`] = {
        unicode: `U+${data.code.toString(16).toUpperCase().padStart(4, '0')}`,
        name: `SHARUUN_LOG_${name.toUpperCase()}`,
        d: data.d,
        desc: data.desc
    };
}

// --- Punctuation ---
glyphs['punct_period'] = { unicode: 'U+E300', name: 'SHARUUN_PERIOD', d: circle(30), desc: 'ShaRuun period' };
glyphs['punct_comma'] = { unicode: 'U+E301', name: 'SHARUUN_COMMA', d: wedge(40, 60, 'right'), desc: 'ShaRuun comma' };
glyphs['punct_section'] = { unicode: 'U+E302', name: 'SHARUUN_SECTION', d: diamond(60, 80), desc: 'ShaRuun section mark' };

// ============================================================
// SVG FONT GENERATOR
// ============================================================

function generateSVGFont() {
    const glyphDefs = [];
    const mapEntries = [];

    for (const [key, glyph] of Object.entries(glyphs)) {
        const uniHex = glyph.unicode.replace('U+', '');
        const uniCode = parseInt(uniHex, 16);

        glyphDefs.push(`
    <glyph unicode="&#x${uniHex};" glyph-name="${glyph.name}" d="${glyph.d}" />
`);

        // Also map Latin transcription where applicable
        if (key.startsWith('v_a') && glyph.unicode === 'U+E100') {
            glyphDefs.push(`    <glyph unicode="a" glyph-name="sha_a" d="${glyph.d}" />`);
        }
    }

    // Add standard Latin glyphs for transcription (borrowed from basic shapes)
    glyphDefs.push(`
    <glyph unicode="A" glyph-name="A" d="M 300,650 L 500,350 L 700,650 M 380,550 L 620,550" />
    <glyph unicode="B" glyph-name="B" d="M 350,300 L 550,300 L 600,400 L 550,500 L 350,500 Z M 350,300 L 350,500" />
    <glyph unicode="K" glyph-name="K" d="M 350,300 L 650,300 M 350,500 L 650,500 M 350,300 L 350,500 L 550,400" />
    <glyph unicode="R" glyph-name="R" d="M 350,300 L 600,300 L 650,400 L 600,500 L 350,500 Z M 600,500 L 650,600" />
    <glyph unicode="S" glyph-name="S" d="M 650,300 Q 450,300 450,400 Q 450,500 650,500 M 450,400 L 650,400" />
    <glyph unicode="T" glyph-name="T" d="M 350,300 L 650,300 M 500,300 L 500,600" />
    <glyph unicode="V" glyph-name="V" d="M 350,300 L 500,600 L 650,300" />
    <glyph unicode="X" glyph-name="X" d="M 350,300 L 650,600 M 650,300 L 350,600" />
    <glyph unicode="." glyph-name="period" d="M 480,550 Q 500,570 520,550 Q 500,530 480,550" />
    <glyph unicode="," glyph-name="comma" d="M 480,550 Q 500,570 520,550 Q 500,530 480,550 M 510,550 L 505,580" />
    <glyph unicode="-" glyph-name="hyphen" d="M 400,500 L 600,500" />
    <glyph unicode=" " glyph-name="space" d="" />
`);

    const xml = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
  <defs>
    <font id="${FONT_NAME}" horiz-adv-x="1000">
      <font-face
        font-family="${FONT_NAME}"
        units-per-em="${UNITS_PER_EM}"
        ascent="800"
        descent="200"
        alphabetic="0"
      />
      <missing-glyph horiz-adv-x="500" d="M 200,300 L 800,300 L 800,700 L 200,700 Z" />
      <glyph unicode="&#x20;" glyph-name="space" horiz-adv-x="500" />
      ${glyphDefs.join('')}
    </font>
  </defs>
  <rect width="100%" height="100%" fill="none" />
  <text x="50" y="50" font-family="${FONT_NAME}" font-size="40">ShaRuun Font Sample</text>
</svg>`;

    return xml;
}

// ============================================================
// MAIN
// ============================================================

if (!fs.existsSync(FONT_DIR)) fs.mkdirSync(FONT_DIR, { recursive: true });

const svgContent = generateSVGFont();
const svgPath = path.join(FONT_DIR, 'sharuu-font.svg');
fs.writeFileSync(svgPath, svgContent, 'utf-8');
console.log(`SVG font generated: ${svgPath}`);
console.log(`Glyphs: ${Object.keys(glyphs).length}`);

// Generate font spec / character map
const mapPath = path.join(FONT_DIR, 'char-map.md');
let mapContent = `# Sha'Ruun Font Character Map

## Numerals (base-6)
| Digit | Code | Glyph Name | Description |
|-------|------|------------|-------------|
`;

for (let i = 0; i <= 5; i++) {
    const key = `num_${i}`;
    if (glyphs[key]) {
        mapContent += `| ${i} | ${glyphs[key].unicode} | ${glyphs[key].name} | ${glyphs[key].desc} |\n`;
    }
}

mapContent += `\n## Vowels\n| Vowel | Code | Glyph Name |\n|-------|------|------------|\n`;
for (const [key, g] of Object.entries(glyphs)) {
    if (key.startsWith('v_')) {
        mapContent += `| ${key.replace('v_', '')} | ${g.unicode} | ${g.name} |\n`;
    }
}

mapContent += `\n## CV Syllables (sample)\n| Syllable | Code | Glyph Name |\n|----------|------|------------|\n`;
let count = 0;
for (const [key, g] of Object.entries(glyphs)) {
    if (key.startsWith('cv_') && count < 30) {
        const label = key.replace('cv_', '');
        mapContent += `| ${label} | ${g.unicode} | ${g.name} |\n`;
        count++;
    }
}
mapContent += `\n*(${count} of ~144 CV shown)*\n`;

mapContent += `\n## Logograms\n| Symbol | Code | Meaning | Glyph Name |\n|--------|------|---------|------------|\n`;
for (const [key, g] of Object.entries(glyphs)) {
    if (key.startsWith('log_')) {
        const name = key.replace('log_', '');
        mapContent += `| ${g.unicode} | ${g.unicode} | ${g.desc} | ${g.name} |\n`;
    }
}

fs.writeFileSync(mapPath, mapContent, 'utf-8');
console.log(`Character map: ${mapPath}`);

// Generate a demo HTML page
const demoHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sha'Ruun Script — Font Demo</title>
<style>
@font-face {
    font-family: '${FONT_NAME}';
    src: url('sharuu-font.svg') format('svg');
}
body { font-family: '${FONT_NAME}', Georgia, serif; background: #1a1a2e; color: #e0d8c8; margin: 0; padding: 40px; }
h1 { font-family: Georgia, serif; color: #c4a87c; border-bottom: 2px solid #c4a87c; }
h2 { color: #a89070; margin-top: 30px; }
.sample { font-family: '${FONT_NAME}'; font-size: 48px; line-height: 1.8; background: #16213e; padding: 30px; border-radius: 8px; margin: 20px 0; text-align: center; color: #f0e6d3; }
.label { font-family: 'Consolas', monospace; font-size: 14px; color: #8a7a6a; margin-bottom: 5px; }
.translation { font-style: italic; color: #b0a090; font-size: 16px; }
.note { background: #0f3460; padding: 15px; border-radius: 5px; margin: 20px 0; color: #c0b4a4; }
table { border-collapse: collapse; margin: 15px 0; }
td { padding: 8px 15px; border: 1px solid #2a3a5a; font-size: 14px; }
td.glyph { font-family: '${FONT_NAME}'; font-size: 32px; text-align: center; background: #16213e; width: 60px; }
th { background: #0f3460; color: #c4a87c; padding: 8px; border: 1px solid #2a3a5a; }
footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #2a3a5a; font-size: 14px; color: #6a5a4a; }
</style>
</head>
<body>

<h1>✦ Sha'Ruun Script — Font Demonstration</h1>
<p class="note">Шрифт Sha'Ruun содержит слоговые знаки (силлабарий), логограммы и цифры (шестеричные).<br>
Направление письма: справа налево, сверху вниз. Отображение ниже — схематическое (слева направо для веба).</p>

<h2>🔢 Numerals (base-6)</h2>
<table>
<tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr>
<td class="glyph">&#xE000;</td><td class="glyph">&#xE001;</td>
<td class="glyph">&#xE002;</td><td class="glyph">&#xE003;</td>
<td class="glyph">&#xE004;</td><td class="glyph">&#xE005;</td>
</tr>
</table>

<h2>🔤 Vowels (8)</h2>
<table>
<tr><th>a</th><th>e</th><th>i</th><th>o</th><th>u</th><th>ə</th><th>iː</th><th>uː</th></tr>
<tr>
<td class="glyph">&#xE100;</td><td class="glyph">&#xE101;</td>
<td class="glyph">&#xE102;</td><td class="glyph">&#xE103;</td>
<td class="glyph">&#xE104;</td><td class="glyph">&#xE105;</td>
<td class="glyph">&#xE106;</td><td class="glyph">&#xE107;</td>
</tr>
</table>

<h2>📖 Logograms (12 key)</h2>
<table>
<tr><th>VOKH<br>вселенная</th><th>KHAR<br>свет</th><th>THE<br>земля</th><th>XA<br>жизнь</th><th>XHA<br>мысль</th><th>RUUN<br>народ</th></tr>
<tr>
<td class="glyph">&#xE200;</td><td class="glyph">&#xE201;</td>
<td class="glyph">&#xE202;</td><td class="glyph">&#xE203;</td>
<td class="glyph">&#xE204;</td><td class="glyph">&#xE205;</td>
</tr>
<tr><th>VEN<br>истина</th><th>MOR<br>время</th><th>RASS<br>единство</th><th>THAR<br>сила</th><th>SHA<br>слово</th><th>NUR<br>рождение</th></tr>
<tr>
<td class="glyph">&#xE206;</td><td class="glyph">&#xE207;</td>
<td class="glyph">&#xE208;</td><td class="glyph">&#xE209;</td>
<td class="glyph">&#xE20A;</td><td class="glyph">&#xE20B;</td>
</tr>
</table>

<h2>✨ Sample Text</h2>
<div class="label">Sha'Ruun (логограммы + силлабарий):</div>
<div class="sample">&#xE200; &#xE201; &#xE202; &#xE203; &#xE204; &#xE205; &#xE206; &#xE207; &#xE208; &#xE209; &#xE20A; &#xE20B;</div>

<div class="label">Khar-Vokh-Ven (Свет-Вселенная-Истина):</div>
<div class="sample">&#xE201;&#xE200; &#xE206;</div>

<div class="label">Sha'Ruun — Xha'Ruun-Vokh Thexen:</div>
<div class="sample">&#xE20A; &#xE204;&#xE205; &#xE200;&#xE20A;&#xE206;</div>

<div class="translation">«Язык народа — писание вселенной-мысли-народа»</div>

<h2>🔤 CV Syllabary — Sample</h2>
<table>
<tr>
<td class="glyph" title="ka">&#xE110;</td>
<td class="glyph" title="kha">&#xE111;</td>
<td class="glyph" title="ga">&#xE112;</td>
<td class="glyph" title="ta">&#xE113;</td>
<td class="glyph" title="tha">&#xE114;</td>
<td class="glyph" title="da">&#xE115;</td>
</tr>
<tr><td>ka</td><td>kha</td><td>ga</td><td>ta</td><td>tha</td><td>da</td></tr>
<tr>
<td class="glyph" title="ra">&#xE116;</td>
<td class="glyph" title="la">&#xE117;</td>
<td class="glyph" title="na">&#xE118;</td>
<td class="glyph" title="sha">&#xE119;</td>
<td class="glyph" title="sa">&#xE11A;</td>
<td class="glyph" title="ma">&#xE11B;</td>
</tr>
<tr><td>ra</td><td>la</td><td>na</td><td>sha</td><td>sa</td><td>ma</td></tr>
</table>

<footer>
<p>Sha'Ruun Font v1.0.0 | PUA: U+E000–U+E30F | ${Object.keys(glyphs).length} glyphs</p>
<p>Designed for the Xha'Ruun Encyclopedia Project</p>
</footer>

</body>
</html>`;

const demoPath = path.join(FONT_DIR, 'sharuu-demo.html');
fs.writeFileSync(demoPath, demoHTML, 'utf-8');
console.log(`Demo page: ${demoPath}`);
console.log(`Total glyphs: ${Object.keys(glyphs).length}`);
console.log('\nDone! Open sharuu-demo.html in a browser to see the font.');
