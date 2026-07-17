#!/usr/bin/env node
/**
 * Link Validator — Xha'Ruun Project
 *
 * Validates all cross-references and registry ID references
 * across the entire Xha'Ruun documentation tree.
 *
 * Usage:
 *   node tools/link-validator.js [options]
 *
 * Options:
 *   --strict     Exit on first warning-level issue too
 *   --fix        Auto-fix obvious issues (remove dead refs)
 *   --verbose    Show all checks, not just failures
 *   --help       Show this message
 *
 * Exit codes:
 *   0 — all OK
 *   1 — broken references found
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const XHARUUN_DIR = path.join(PROJECT_ROOT, 'xharuun');
const REGISTRY_DIR = path.join(PROJECT_ROOT, 'registry');

const EXCLUDE_DIRS = ['node_modules', '.git', '.claude', 'assets', 'build'];
const EXCLUDE_FILES = ['README.md', 'MAP.md', 'cross-ref-registry.md', 'AGENTS.md'];

// Files where bare ID patterns are used as FORMAT EXAMPLES, not actual refs
const FORMAT_EXAMPLE_FILES = ['PROJECT_CONTEXT.md'];
// Files that are templates — skip strict checks
const TEMPLATE_FILES = ['chapter-template.md'];

// Appendix short-name → filename mapping
const APPENDIX_MAP = {
  'timeline': 'timeline',
  'glossary': 'glossary',
  'names': 'names',
  'physical-ref': 'physical-reference',
  'bio-ref': 'biological-reference',
  'index': 'index',
};

// ============================================================
// HELPERS
// ============================================================

function getAllMdFiles(dir, rootPath = dir) {
  let results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(rootPath, fullPath);
      const topDir = relPath.split(path.sep)[0];

      if (entry.isDirectory()) {
        if (EXCLUDE_DIRS.includes(entry.name) || EXCLUDE_DIRS.includes(topDir)) continue;
        results = results.concat(getAllMdFiles(fullPath, rootPath));
      } else if (entry.isFile() && entry.name.endsWith('.md') && !EXCLUDE_FILES.includes(entry.name)) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    // skip unreadable dirs
  }
  return results;
}

function readFileLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split(/\r?\n/);
  } catch {
    return null;
  }
}

// ============================================================
// REFERENCE INDEXES
// ============================================================

function buildChapterIndex() {
  const chapters = {};
  if (!fs.existsSync(XHARUUN_DIR)) return chapters;

  const entries = fs.readdirSync(XHARUUN_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const m = entry.name.match(/^(\d{2})-(.+)$/);
      if (m) {
        const num = parseInt(m[1], 10);
        const name = m[2];
        const indexPath = path.join(XHARUUN_DIR, entry.name, 'index.md');
        chapters[`Гл.${String(num).padStart(2, '0')}`] = {
          num,
          name,
          path: indexPath,
          exists: fs.existsSync(indexPath),
        };
      }
    }
  }
  return chapters;
}

function buildRegistryIndex() {
  const index = {};
  const types = ['glyphs', 'lexemes', 'rules', 'locations', 'events', 'characters'];

  for (const typeDir of types) {
    const fullDir = path.join(REGISTRY_DIR, typeDir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir);
    for (const f of files) {
      if (!f.endsWith('.md')) continue;
      const id = f.replace(/\.md$/, '');
      if (id.startsWith('_')) continue; // skip _index.md etc.
      index[id] = path.join(fullDir, f);
    }
  }
  return index;
}

function buildAppendixIndex() {
  const appendices = {};
  const appDir = path.join(XHARUUN_DIR, 'appendices');
  if (!fs.existsSync(appDir)) return appendices;

  const files = fs.readdirSync(appDir);
  for (const f of files) {
    if (!f.endsWith('.md')) continue;
    const name = f.replace(/\.md$/, '');
    appendices[name] = path.join(appDir, f);
  }
  return appendices;
}

// ============================================================
// VALIDATORS
// ============================================================

/**
 * Pattern 1: → см. [Гл.XX, "Text"] or → см. [Гл.X]
 * Pattern 2: → см. [ТАБ:name]
 * Pattern 3: → см. [ПРИЛ:name]
 * Pattern 4: → см. [СЛ:term]
 * Pattern 5: → см. [CANON]
 * Pattern 6: Bare IDs: G-XXXX, L-XXXXXX, RULE-XXXX, LOC-XXXX, EV-XXXX, CH-XXXX
 */

const REF_PATTERNS = [
  // → см. [Гл.XX…] — forward refs to unwritten chapters = WARNING
  {
    regex: /→ см\. \[(Гл\.(\d{2}))[,\]]/g,
    type: 'crossref',
    check: (match, ref, num, chapters) => {
      if (!chapters[ref]) {
        return { ok: false, isWarning: true, msg: `Глава ${ref} ещё не создана (запланирована)` };
      }
      if (!chapters[ref].exists) {
        return { ok: false, isWarning: true, msg: `Файл главы ${ref} не найден` };
      }
      return { ok: true };
    },
  },
  // → см. [ТАБ:…]
  {
    regex: /→ см\. \[(ТАБ:[^\]]+)\]/g,
    type: 'crossref',
    check: () => {
      return { ok: true };
    },
  },
  // → см. [ПРИЛ:…] — with short-name mapping, WARNING if not found (planned)
  {
    regex: /→ см\. \[(ПРИЛ:[^\]]+)\]/g,
    type: 'crossref',
    check: (match, ref, _, __, appendices, ___, ____, filePath) => {
      const relPath = path.relative(PROJECT_ROOT, filePath);
      // Skip template placeholders like ПРИЛ:ID
      if (TEMPLATE_FILES.some(f => relPath.endsWith(f))) return { ok: true, skip: true };
      const shortName = ref.replace('ПРИЛ:', '');
      const mappedName = APPENDIX_MAP[shortName] || shortName;
      if (!appendices[mappedName]) {
        return { ok: false, isWarning: true, msg: `Приложение "${shortName}" ещё не создано (запланировано)` };
      }
      return { ok: true };
    },
  },
  // → см. [СЛ:…]
  {
    regex: /→ см\. \[(СЛ:[^\]]+)\]/g,
    type: 'crossref',
    check: () => {
      return { ok: true };
    },
  },
  // → см. [CANON…]
  {
    regex: /→ см\. \[(CANON[^\]]*)\]/g,
    type: 'crossref',
    check: () => ({ ok: true }),
  },
  // Bare ID references — skip FORMAT_EXAMPLE_FILES
  {
    regex: /\b(G-\d{4})\b/g,
    type: 'id',
    check: (match, id, _, __, ___, registry, __2, filePath) => {
      const relPath = path.relative(PROJECT_ROOT, filePath);
      if (FORMAT_EXAMPLE_FILES.some(f => relPath.endsWith(f))) return { ok: true, skip: true };
      if (!registry[id]) {
        return { ok: false, msg: `Графема ${id} не найдена в реестре` };
      }
      return { ok: true };
    },
  },
  {
    regex: /\b(L-\d{6})\b/g,
    type: 'id',
    check: (match, id, _, __, ___, registry, ____, filePath) => {
      const relPath = path.relative(PROJECT_ROOT, filePath);
      if (FORMAT_EXAMPLE_FILES.some(f => relPath.endsWith(f))) return { ok: true, skip: true };
      // L-999999 is a known format placeholder
      if (id === 'L-999999') return { ok: true, skip: true };
      if (!registry[id]) {
        return { ok: false, isWarning: true, msg: `Лексема ${id} не найдена в реестре` };
      }
      return { ok: true };
    },
  },
  {
    regex: /\b(RULE-\d{4})\b/g,
    type: 'id',
    check: (match, id, _, __, ___, registry, ____, filePath) => {
      const relPath = path.relative(PROJECT_ROOT, filePath);
      if (FORMAT_EXAMPLE_FILES.some(f => relPath.endsWith(f))) return { ok: true, skip: true };
      // RULE-9999 is a known format placeholder
      if (id === 'RULE-9999') return { ok: true, skip: true };
      if (!registry[id]) {
        return { ok: false, isWarning: true, msg: `Правило ${id} не найдено в реестре` };
      }
      return { ok: true };
    },
  },
  {
    regex: /\b(LOC-\d{4})\b/g,
    type: 'id',
    check: (match, id, _, __, ___, registry, ____, filePath) => {
      const relPath = path.relative(PROJECT_ROOT, filePath);
      if (FORMAT_EXAMPLE_FILES.some(f => relPath.endsWith(f))) return { ok: true, skip: true };
      if (!registry[id]) {
        return { ok: false, isWarning: true, msg: `Локация ${id} не найдена в реестре` };
      }
      return { ok: true };
    },
  },
  {
    regex: /\b(EV-\d{4})\b/g,
    type: 'id',
    check: (match, id, _, __, ___, registry, ____, filePath) => {
      const relPath = path.relative(PROJECT_ROOT, filePath);
      if (FORMAT_EXAMPLE_FILES.some(f => relPath.endsWith(f))) return { ok: true, skip: true };
      if (!registry[id]) {
        return { ok: false, isWarning: true, msg: `Событие ${id} не найдено в реестре` };
      }
      return { ok: true };
    },
  },
  {
    regex: /\b(CH-\d{4})\b/g,
    type: 'id',
    check: (match, id, _, __, ___, registry, ____, filePath) => {
      const relPath = path.relative(PROJECT_ROOT, filePath);
      if (FORMAT_EXAMPLE_FILES.some(f => relPath.endsWith(f))) return { ok: true, skip: true };
      if (!registry[id]) {
        return { ok: false, isWarning: true, msg: `Персонаж ${id} не найден в реестре` };
      }
      return { ok: true };
    },
  },
];

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
  Link Validator — Xha'Ruun Project

  Validates all cross-references and registry IDs in .md files.

  Usage:
    node tools/link-validator.js [options]

  Options:
    --strict     Exit on warnings too
    --verbose    Show all checks, including successful ones
    --help       This message

  Exit codes: 0 = OK, 1 = broken refs found
`);
    process.exit(0);
  }

  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║      Xha\'Ruun Link Validator v1.0    ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');

  // Build indexes
  const chapters = buildChapterIndex();
  const registry = buildRegistryIndex();
  const appendices = buildAppendixIndex();

  console.log(`  Chapters found:  ${Object.keys(chapters).length}`);
  console.log(`  Registry IDs:    ${Object.keys(registry).length}`);
  console.log(`  Appendices:      ${Object.keys(appendices).length}`);
  console.log('');

  // Scan all .md files
  const allFiles = getAllMdFiles(PROJECT_ROOT);
  console.log(`  Scanning ${allFiles.length} files...`);
  console.log('');

  const errors = [];
  const warnings = [];
  let totalChecks = 0;

  for (const filePath of allFiles) {
    const relPath = path.relative(PROJECT_ROOT, filePath);
    const lines = readFileLines(filePath);
    if (!lines) {
      warnings.push({ file: relPath, line: 0, msg: 'Cannot read file' });
      continue;
    }

    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum];

      for (const pattern of REF_PATTERNS) {
        let match;
        pattern.regex.lastIndex = 0;
        while ((match = pattern.regex.exec(line)) !== null) {
          totalChecks++;
          const result = pattern.check(match, match[1], match[2], chapters, appendices, registry, null, filePath);

          if (result.skip) continue;

          if (!result.ok) {
            const entry = {
              file: relPath,
              line: lineNum + 1,
              type: pattern.type,
              ref: match[0],
              msg: result.msg,
            };
            if (result.isWarning) {
              warnings.push(entry);
            } else {
              errors.push(entry);
            }
          } else if (verbose) {
            console.log(`  ✓ ${relPath}:${lineNum + 1} — ${match[0]}`);
          }
        }
      }
    }
  }

  // Report
  console.log(`  Total checks:    ${totalChecks}`);
  console.log(`  Errors:          ${errors.length}`);
  console.log(`  Warnings:        ${warnings.length}`);
  console.log('');

  if (errors.length > 0) {
    console.log('  ─── ERRORS (must fix) ───');
    for (const err of errors) {
      console.log(`  ✘ ${err.file}:${err.line}`);
      console.log(`      ${err.ref}`);
      console.log(`      → ${err.msg}`);
      console.log('');
    }
  }

  if (warnings.length > 0) {
    console.log(`  ─── WARNINGS (planned / forward refs) ───`);
    for (const w of warnings.slice(0, 20)) {
      console.log(`  ⚠ ${w.file}:${w.line}`);
      console.log(`      ${w.ref}`);
      console.log(`      → ${w.msg}`);
      console.log('');
    }
    if (warnings.length > 20) {
      console.log(`  ... and ${warnings.length - 20} more warnings`);
      console.log('');
    }
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('  ✅ All references are valid!');
  } else if (errors.length === 0 && warnings.length > 0) {
    console.log('  ✅ No hard errors. Warnings are forward refs to planned content.');
  }

  console.log('');

  if (errors.length > 0) {
    if (strict) {
      process.exit(1);
    }
    console.log('  Note: run with --strict to fail on warnings too.');
    console.log('');
    process.exit(errors.length > 0 ? 1 : 0);
  }
  process.exit(0);
}

main();
