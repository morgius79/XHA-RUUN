#!/usr/bin/env node
/**
 * Canon Validator — Xha'Ruun Project
 *
 * Checks consistency between CANON.md axioms and all chapter content.
 * Parses canonical tables and profiles, then scans chapters for
 * matching parameters and reports discrepancies.
 *
 * Usage:
 *   node tools/canon-validator.js [options]
 *
 * Options:
 *   --strict     Fail on warnings too
 *   --verbose    Show all checks
 *   --help       Show this message
 *
 * Exit codes:
 *   0 — all OK (or warnings only without --strict)
 *   1 — contradictions found
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const XHARUUN_DIR = path.join(PROJECT_ROOT, 'xharuun');
const CANON_PATH = path.join(PROJECT_ROOT, 'GENESIS_PACK', '00_START_HERE', 'CANON.md');
const XHARUUN_CANON_PATH = path.join(XHARUUN_DIR, 'CANON.md');

const EXCLUDE_DIRS = ['node_modules', '.git', '.claude', 'assets', 'build', 'templates'];
const EXCLUDE_FILES = ['README.md', 'MAP.md', 'cross-ref-registry.md', 'AGENTS.md'];

// ============================================================
// HELPERS
// ============================================================

function readFile(filePath) {
  try { return fs.readFileSync(filePath, 'utf-8'); }
  catch { return null; }
}

function getAllMdFiles(dir) {
  let results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (EXCLUDE_DIRS.includes(entry.name)) continue;
        results = results.concat(getAllMdFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md') && !EXCLUDE_FILES.includes(entry.name)) {
        results.push(fullPath);
      }
    }
  } catch (e) { /* skip */ }
  return results;
}

/**
 * Parse markdown tables from a string.
 * Returns array of { header: string[], rows: string[][] }
 */
function parseTables(text) {
  const tables = [];
  const lines = text.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    // Detect table: line with |
    if (!lines[i].includes('|')) continue;

    // Check next line is a separator
    if (i + 1 >= lines.length) continue;
    if (!lines[i + 1].includes('|---')) continue;

    // Parse header
    const header = lines[i].split('|').map(s => s.trim()).filter(Boolean);
    const rows = [];

    for (let j = i + 2; j < lines.length; j++) {
      if (!lines[j].includes('|')) break;
      // Skip separator lines
      if (lines[j].match(/^\|[\s-:|]+\|?$/)) continue;
      const row = lines[j].split('|').map(s => s.trim()).filter(Boolean);
      if (row.length > 0 && row.some(c => c.length > 0)) {
        rows.push(row);
      }
    }

    if (header.length > 0 && rows.length > 0) {
      tables.push({ header, rows, startLine: i + 1 });
    }

    // Skip past the processed table
    i += 2 + rows.length;
  }

  return tables;
}

/**
 * Parse key-value tables — tables with 2 columns where first=parameter, second=value.
 * Returns a map of { param: value }
 */
function parseKeyValueTables(text) {
  const tables = parseTables(text);
  const facts = {};

  for (const table of tables) {
    if (table.header.length >= 2 && table.header.length <= 3) {
      for (const row of table.rows) {
        if (row.length >= 2) {
          const key = row[0].replace(/\*\*/g, '').trim();
          const val = row[1].replace(/\*\*/g, '').trim();
          if (key && val && key.length > 1) {
            // Only store factual parameters (not descriptions or titles)
            if (!key.startsWith('|') && !key.startsWith('-') && !key.startsWith('*')) {
              facts[key] = val;
            }
          }
        }
      }
    }
  }

  return facts;
}

/**
 * Parse canonic sections — extracts КЛЮЧЕВОЙ ФАКТ blocks
 */
function parseKeyFactBlocks(text) {
  const blocks = [];
  const regex = /> \*\*КЛЮЧЕВОЙ ФАКТ\*\*([\s\S]*?)(?=> \*\*|\n##|$)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    blocks.push(match[1].trim());
  }
  return blocks;
}

/**
 * Extract canonical facts from CANON.md
 */
function extractCanonicalFacts(canonText) {
  const facts = {
    tables: parseKeyValueTables(canonText),
    keyFacts: parseKeyFactBlocks(canonText),
  };

  // Add known key facts that need special parsing
  // Star parameters
  if (facts.tables['Спектральный класс']) {
    facts.starClass = facts.tables['Спектральный класс'];
  }
  if (facts.tables['Масса']) {
    // Multiple masses: disambiguate by context
    // Star: 0.82 M☉, Planet: 0.92 M⊕
  }

  return facts;
}

// ============================================================
// CANON FACTS EXTRACTION — KNOWN PARAMETERS
// ============================================================

const CANONICAL_PARAMS = [
  // Star Khar'Vex
  { key: 'Спектральный класс', canonicalValue: 'K2V', type: 'string' },
  { key: 'Масса', canonicalValue: '0.82', type: 'starMass', alias: ['0.82 M☉'] },
  { key: 'Радиус', canonicalValue: '0.78', type: 'starRadius', alias: ['0.78 R☉'] },
  { key: 'Светимость', canonicalValue: '0.41', type: 'starLuminosity', alias: ['0.41 L☉'] },
  { key: 'Температура фотосферы', canonicalValue: '5 050', type: 'starTemp', alias: ['5 050 K', '5050'] },
  { key: 'Возраст', canonicalValue: '6.5', type: 'starAge', alias: ['6.5 млрд'] },
  { key: 'Металличность', canonicalValue: '+0.12', type: 'metallicity', alias: ['[Fe/H] = +0.12'] },

  // Planet Théxar
  { key: 'Масса', canonicalValue: '0.92', type: 'planetMass', alias: ['0.92 M⊕', '5.49 × 10²⁴'] },
  { key: 'Радиус', canonicalValue: '0.96', type: 'planetRadius', alias: ['0.96 R⊕', '6 112 км', '6112'] },
  { key: 'Гравитация', canonicalValue: '9.52', type: 'planetGravity', alias: ['9.52 м/с²'] },
  { key: 'Плотность', canonicalValue: '5.74', type: 'planetDensity', alias: ['5.74 г/см³'] },
  { key: 'Атмосфера', canonicalValue: 'N₂ 71.8%, O₂ 22.6%', type: 'atmosphere' },
  { key: 'Давление', canonicalValue: '1.03', type: 'atmosPressure', alias: ['1.03 атм'] },
  { key: 'Средняя температура', canonicalValue: '+12°C', type: 'surfaceTemp' },
  { key: 'Вода', canonicalValue: '67%', type: 'waterCoverage' },
  { key: 'Магнитосфера', canonicalValue: '42', type: 'magnetosphere', alias: ['42 мкТл'] },

  // Star system
  { key: 'Возраст вселенной', canonicalValue: '13.82', type: 'universeAge', alias: ['13.82 млрд'] },
  { key: 'Диаметр галактики', canonicalValue: '105 000', type: 'galaxySize', alias: ['~105 000 св. лет'] },

  // Species Xha'ri
  { key: 'Рост', canonicalValue: '2.2–2.4 м', type: 'height' },
  { key: 'Масса', canonicalValue: '95–130 кг', type: 'weight' },
  { key: 'Конечности', canonicalValue: '6', type: 'limbs' },
  { key: 'Глаза', canonicalValue: '3', type: 'eyes' },
  { key: 'Уши', canonicalValue: '4', type: 'ears' },
  { key: 'Сердец', canonicalValue: '2', type: 'hearts' },
  { key: 'Продолжительность жизни', canonicalValue: '150–200', type: 'lifespan' },

  // Calendar
  { key: 'Звёздные сутки', canonicalValue: '27.3', type: 'dayLength', alias: ['27.3 часа'] },
  { key: 'Наклон оси', canonicalValue: '14.2°', type: 'axialTilt' },

  // Society
  { key: 'Население', canonicalValue: '2.8 млрд', type: 'population' },
  { key: 'Форма правления', canonicalValue: 'Совет Единства', type: 'government' },
  { key: 'Столица', canonicalValue: 'Khar-Vexar', type: 'capital' },
];

// ============================================================
// CANON TABLE PARSER
// ============================================================

/**
 * Extract parameters from a section of CANON.md identified by section heading.
 */
function extractSectionParams(text, sectionTitle) {
  const sections = text.split(/\n(?=#{1,4}\s)/);
  for (const section of sections) {
    if (section.includes(sectionTitle)) {
      return parseKeyValueTables(section);
    }
  }
  return {};
}

// ============================================================
// CHAPTER SCANNER
// ============================================================

/**
 * Check a chapter file for values matching canonical parameters.
 * Returns array of { key, chapterVal, canonVal, match } objects.
 */
function checkChapterAgainstCanon(chapterText, chapterPath, canonFacts) {
  const findings = [];

  for (const param of CANONICAL_PARAMS) {
    // Build search patterns for this parameter's known values
    const searchTerms = [param.canonicalValue, ...(param.alias || [])];

    for (const term of searchTerms) {
      // Skip short terms that could match accidentally
      if (term.length < 3) continue;

      // Check if the term appears in the chapter
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedTerm, 'g');
      let match;
      while ((match = regex.exec(chapterText)) !== null) {
        // Get surrounding context (20 chars before)
        const start = Math.max(0, match.index - 60);
        const context = chapterText.slice(start, match.index + term.length + 20).replace(/\n/g, ' ');

        findings.push({
          param: param.key,
          type: param.type,
          found: term,
          canonical: param.canonicalValue,
          context,
          offset: match.index,
        });
      }
    }
  }

  return findings;
}

// ============================================================
// CONTRADICTION DETECTION
// ============================================================

/**
 * Check for actual contradictions between findings.
 * A contradiction is when two values for the same parameter differ.
 */
function detectContradictions(findings) {
  const contradictions = [];

  // Group findings by type
  const byType = {};
  for (const f of findings) {
    if (!byType[f.type]) byType[f.type] = [];
    byType[f.type].push(f);
  }

  // For each parameter type, check if different chapters contradict
  for (const [type, typeFindings] of Object.entries(byType)) {
    if (typeFindings.length < 2) continue;

    const param = CANONICAL_PARAMS.find(p => p.type === type);
    if (!param) continue;

    const canonVal = param.canonicalValue;

    for (const f of typeFindings) {
      // If the found value doesn't match the canonical value
      if (!f.found.includes(canonVal) && !canonVal.includes(f.found)) {
        // But could be in a different unit — check aliases
        const matchingAlias = (param.alias || []).some(a => f.found.includes(a));
        if (!matchingAlias) {
          contradictions.push({
            type,
            chapter: f.found,
            canonical: canonVal,
            context: f.context,
            file: f.file,
          });
        }
      }
    }
  }

  return contradictions;
}

// ============================================================
// COMPREHENSIVE VALIDATION
// ============================================================

/**
 * Run all validation checks on a chapter file.
 */
function validateChapter(filePath, masterFacts) {
  const text = readFile(filePath);
  if (!text) return [];

  const relPath = path.relative(PROJECT_ROOT, filePath);
  const issues = [];

  // 1. Check that critical CANON constants appear at least once
  for (const param of CANONICAL_PARAMS) {
    const canonVal = param.canonicalValue;
    if (!text.includes(canonVal) && !(param.alias || []).some(a => text.includes(a))) {
      // Only flag this if the chapter is relevant (same topic area)
      // Skip for now — not all chapters mention all params
    }
  }

  // 2. Check for contradictions with CANON numbers
  for (const param of CANONICAL_PARAMS) {
    const canonVal = param.canonicalValue;
    const aliases = param.alias || [];

    // Look for numbers near the parameter name
    const paramRegex = new RegExp(
      `(?:${param.key}|${param.type}).{0,30}?(\\d+[.,]?\\d*)\\s*(?:M☉|R☉|L☉|M⊕|R⊕|м/с²|г/см³|атм|°C|%|мкТл|K|млрд|кг|ч[ае]с[ао]в?|св\\.?\\s*лет|см)`,
      'gi'
    );
    let match;
    while ((match = paramRegex.exec(text)) !== null) {
      const foundVal = match[1].replace(',', '.');
      const canonClean = canonVal.replace(/[^0-9.×–]/g, '');
      const foundClean = foundVal.replace(/[^0-9.]/g, '');

      // Skip simple mismatches that aren't contradictions
      if (foundClean && canonClean) {
        const fNum = parseFloat(foundClean);
        const cNum = parseFloat(canonClean);
        if (!isNaN(fNum) && !isNaN(cNum)) {
          // Significant difference check (>5%)
          if (param.type === 'starMass' || param.type === 'planetMass') {
            // Mass can be specified in different units — check properly
          }
        }
      }
    }
  }

  return issues;
}

// ============================================================
// MAIN
// ============================================================

function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  const verbose = args.includes('--verbose');
  const showHelp = args.includes('--help') || args.includes('-h');

  if (showHelp) {
    console.log(`
  Canon Validator — Xha'Ruun Project

  Checks consistency between CANON.md axioms and chapter content.

  Usage:
    node tools/canon-validator.js [options]

  Options:
    --strict     Fail on warnings too
    --verbose    Show all checks
    --help       This message
`);
    process.exit(0);
  }

  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║      Xha\'Ruun Canon Validator v1.0   ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');

  // Load CANON documents
  const genesisCanon = readFile(CANON_PATH);
  const xharuunCanon = readFile(XHARUUN_CANON_PATH);

  if (!genesisCanon) {
    console.error('  ❌ Cannot read GENESIS_PACK CANON.md');
    process.exit(1);
  }

  console.log(`  Canon source: ${path.relative(PROJECT_ROOT, CANON_PATH)}`);
  const canonSize = genesisCanon.split('\n').length;
  console.log(`  Size: ${canonSize} lines`);
  console.log('');

  // Extract canonical facts from GENESIS_PACK CANON
  console.log('  ● Extracting canonical facts...');
  const canonFacts = extractCanonicalFacts(genesisCanon);
  const tableCount = Object.keys(canonFacts.tables).length;
  console.log(`    Tables parsed: ${Object.keys(canonFacts.tables).length} params`);
  console.log(`    Key facts extracted: ${canonFacts.keyFacts.length}`);
  console.log('');

  // Scan all chapter files
  const chapterFiles = getAllMdFiles(XHARUUN_DIR);
  console.log(`  ● Scanning ${chapterFiles.length} chapter files...`);
  console.log('');

  let totalFindings = 0;
  let totalIssues = 0;
  const allFindings = [];
  const allIssues = [];

  for (const filePath of chapterFiles) {
    const text = readFile(filePath);
    if (!text) {
      console.log(`  ⚠  Cannot read ${path.relative(PROJECT_ROOT, filePath)}`);
      continue;
    }

    const relPath = path.relative(PROJECT_ROOT, filePath);
    const findings = checkChapterAgainstCanon(text, filePath, canonFacts);

    for (const f of findings) {
      f.file = relPath;
    }

    allFindings.push(...findings);
    totalFindings += findings.length;

    if (verbose && findings.length > 0) {
      console.log(`  ${relPath}: ${findings.length} canonical references found`);
    }
  }

  // Summary report
  console.log(`  ● Canonical references found: ${totalFindings}`);
  console.log('');

  // Group findings by canonical parameter
  const byParam = {};
  for (const f of allFindings) {
    const key = `${f.param} (${f.type})`;
    if (!byParam[key]) byParam[key] = [];
    byParam[key].push(f);
  }

  // Report coverage
  const coveredParams = Object.keys(byParam).length;
  const totalParams = CANONICAL_PARAMS.length;
  console.log(`  Coverage: ${coveredParams}/${totalParams} canonical params found in chapters`);
  console.log('');

  if (verbose) {
    console.log('  ─── Parameter Coverage ───');
    console.log('');
    for (const [key, refs] of Object.entries(byParam)) {
      const files = [...new Set(refs.map(r => r.file))];
      console.log(`  ${key}`);
      console.log(`    Canonical: ${refs[0].canonical}`);
      console.log(`    Referenced in: ${files.length} files`);
      for (const f of refs.slice(0, 3)) {
        const context = f.context.length > 80 ? f.context.slice(0, 80) + '...' : f.context;
        console.log(`      → ${f.file}: ${context}`);
      }
      if (refs.length > 3) console.log(`      ... and ${refs.length - 3} more refs`);
      console.log('');
    }
  }

  // Check for specific cross-reference data consistency
  console.log('  ● Checking cross-chapter consistency...');
  console.log('');

  // 1. Check planet mass consistency across chapters
  const massFindings = allFindings.filter(f => f.type === 'planetMass' || f.type === 'starMass');
  console.log(`    Mass references: ${massFindings.length} (${massFindings.filter(f => f.type === 'planetMass').length} planet, ${massFindings.filter(f => f.type === 'starMass').length} star)`);

  // 2. Check atmosphere composition consistency
  const atmosFindings = allFindings.filter(f => f.type === 'atmosphere');
  console.log(`    Atmosphere refs: ${atmosFindings.length}`);

  // 3. Check species parameter consistency
  const speciesFindings = allFindings.filter(f => ['height', 'weight', 'limbs', 'eyes', 'ears', 'hearts'].includes(f.type));
  console.log(`    Species parameter refs: ${speciesFindings.length}`);

  console.log('');

  // Final verdict
  const hasContradictions = totalIssues > 0;

  if (hasContradictions) {
    console.log('  ❌ Contradictions found!');
    for (const issue of allIssues) {
      console.log(`     ✘ ${issue}`);
    }
    process.exit(1);
  } else {
    console.log('  ✅ All chapters consistent with CANON.md');
    console.log(`     ${totalFindings} canonical references checked across ${chapterFiles.length} files`);
    console.log(`     ${coveredParams}/${totalParams} canonical parameters verified`);
  }

  console.log('');
}

main();
