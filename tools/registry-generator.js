#!/usr/bin/env node
/**
 * Registry Generator — Xha'Ruun Project
 *
 * Auto-assigns next available ID and generates a registry card
 * for any entity type: glyph, lexeme, rule, location, event, character.
 *
 * Usage:
 *   node tools/registry-generator.js <type> --name <name> [options]
 *
 * Types: glyph, lexeme, rule, location, event, character
 *
 * Options:
 *   --name <name>         Entity name (e.g. "khar-vex")
 *   --desc <desc>         Description text
 *   --refs <ids>          Comma-separated related IDs
 *   --type-sub <sub>      Sub-type (city, person, grammar, etc.)
 *   -y                    Skip confirmation
 *   --dry-run             Show what would be created without writing
 *   --help                Show this help
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIG
// ============================================================

const PROJECT_ROOT = path.resolve(__dirname, '..');
const REGISTRY_DIR = path.join(PROJECT_ROOT, 'registry');

const TYPES = {
  glyph: {
    dir: 'glyphs',
    idPrefix: 'G',
    idPattern: /^G-(\d{4})\.md$/,
    idFormat: (n) => `G-${String(n).padStart(4, '0')}`,
    idStart: 1,
    idEnd: 9999,
    fields: ['transliteration', 'pronunciation', 'type', 'syllable'],
    description: 'графема письменности Xha\'Ruun',
  },
  lexeme: {
    dir: 'lexemes',
    idPrefix: 'L',
    idPattern: /^L-(\d{6})\.md$/,
    idFormat: (n) => `L-${String(n).padStart(6, '0')}`,
    idStart: 1,
    idEnd: 999999,
    fields: ['root', 'part_of_speech', 'translation'],
    description: 'лексема (слово или морфема)',
  },
  rule: {
    dir: 'rules',
    idPrefix: 'RULE',
    idPattern: /^RULE-(\d{4})\.md$/,
    idFormat: (n) => `RULE-${String(n).padStart(4, '0')}`,
    idStart: 1,
    idEnd: 9999,
    fields: ['type', 'rule_text'],
    description: 'правило (грамматическое или каноническое)',
  },
  location: {
    dir: 'locations',
    idPrefix: 'LOC',
    idPattern: /^LOC-(\d{4})\.md$/,
    idFormat: (n) => `LOC-${String(n).padStart(4, '0')}`,
    idStart: 1,
    idEnd: 9999,
    fields: ['type', 'continent', 'description'],
    description: 'локация (географическая точка или регион)',
  },
  event: {
    dir: 'events',
    idPrefix: 'EV',
    idPattern: /^EV-(\d{4})\.md$/,
    idFormat: (n) => `EV-${String(n).padStart(4, '0')}`,
    idStart: 1,
    idEnd: 9999,
    fields: ['type', 'date', 'epoch'],
    description: 'историческое событие',
  },
  character: {
    dir: 'characters',
    idPrefix: 'CH',
    idPattern: /^CH-(\d{4})\.md$/,
    idFormat: (n) => `CH-${String(n).padStart(4, '0')}`,
    idStart: 1,
    idEnd: 9999,
    fields: ['species', 'role', 'epoch'],
    description: 'персонаж (историческая или современная личность)',
  },
};

// ============================================================
// HELPERS
// ============================================================

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function findNextId(typeDir, idPattern, formatFn, start) {
  if (!fs.existsSync(typeDir)) {
    return start;
  }
  const files = fs.readdirSync(typeDir);
  let max = 0;
  for (const f of files) {
    const m = f.match(idPattern);
    if (m) {
      const num = parseInt(m[1], 10);
      if (num > max) max = num;
    }
  }
  return max + 1;
}

function writeFileSafe(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

// ============================================================
// TEMPLATES
// ============================================================

function renderGlyph(opts) {
  const { id, name, transliteration, pronunciation, glyphType, syllable, desc, refs } = opts;
  const lines = [
    '---',
    `id: ${id}`,
    'type: grapheme',
    'status: active',
    'version: 1.0',
    '---',
    '',
    `# ${id} — ${name.charAt(0).toUpperCase() + name.slice(1)}`,
    '',
    transliteration ? `**Транслитерация:** ${transliteration}  ` : '',
    pronunciation ? `**Произношение:** ${pronunciation}  ` : '',
    glyphType ? `**Тип:** ${glyphType}  ` : '',
    syllable ? `**Слог:** ${syllable}` : '',
    '',
    '**Описание:** ' + (desc || 'Графема письменности Xha\'Ruun.'),
    '',
    '**Употребление:**',
    '- В составе корневых слов',
    '- В грамматических суффиксах',
    '',
    '**Графическое строение (16×16):**',
    '- Модульная сетка 16×16',
    '- Толщина штриха: 1 ед.',
    '',
  ];

  if (refs.length > 0) {
    lines.push('**Связи:**');
    for (const r of refs) {
      lines.push(`- → ${r}`);
    }
    lines.push('');
  }

  return lines.filter(l => l !== undefined).join('\n');
}

function renderLexeme(opts) {
  const { id, name, root, partOfSpeech, translation, desc, refs } = opts;
  const lines = [
    `# ${id}: ${name}`,
    '',
    root ? `**Корень:** ${root}` : '**Корень:** —',
    `**Часть речи:** ${partOfSpeech || 'корень'}`,
    `**Перевод:** ${translation || desc || '—'}`,
    '**Статус:** active',
    `**Создан:** ${today()}`,
    '',
    '## Этимология',
    '',
    desc || 'Корень языка Xha\'Ruun.',
    '',
    '## Примеры',
    '',
    `1. ${name} theri vexo. — ...`,
    `2. ${name} kharo ruuna. — ...`,
    '',
    '## Производные',
    '',
    `- ${name}a, ${name}e, ${name}i, ${name}o`,
    '',
  ];

  if (refs.length > 0) {
    lines.push('## Связанные объекты\n');
    for (const r of refs) {
      lines.push(`- ${r}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function renderRule(opts) {
  const { id, name, ruleType, ruleText, desc, refs } = opts;
  const lines = [
    `# ${id}: ${name}`,
    '',
    `**Тип:** ${ruleType || 'грамматика'}`,
    '**Статус:** active',
    `**Создан:** ${today()}`,
    '',
    '## Формулировка',
    '',
    ruleText || desc || 'Правило языка или канона Xha\'Ruun.',
    '',
    '## Описание',
    '',
    desc || 'Подробное описание правила.',
    '',
    '## Примеры',
    '',
    '1. Пример соблюдения: ...',
    '2. Пример нарушения: ...',
    '',
  ];

  if (refs.length > 0) {
    lines.push('## Связанные правила\n');
    for (const r of refs) {
      lines.push(`- ${r}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function renderLocation(opts) {
  const { id, name, locType, continent, desc, refs } = opts;
  const lines = [
    `# ${id}: ${name}`,
    '',
    `**Тип:** ${locType || 'географический объект'}`,
    continent ? `**Континент/Регион:** ${continent}` : '',
    '**Статус:** active',
    `**Создан:** ${today()}`,
    '',
    '## Описание',
    '',
    desc || 'Географическая точка или регион планеты Théxar.',
    '',
    '## Ключевые характеристики',
    '',
    '- **Население:** —',
    '- **Площадь:** —',
    '- **Основание:** —',
    '',
    '## Значение',
    '',
    'Описание значения локации.',
    '',
  ];

  if (refs.length > 0) {
    lines.push('## Связанные объекты\n');
    for (const r of refs) {
      lines.push(`- ${r}`);
    }
    lines.push('');
  }

  return lines.filter(l => l !== undefined && l !== '').join('\n');
}

function renderEvent(opts) {
  const { id, name, eventType, date, epoch, desc, reasons, consequences, refs } = opts;
  const lines = [
    `# ${id}: ${name}`,
    '',
    `**Тип:** ${eventType || 'событие'}`,
    date ? `**Дата:** ${date}` : '',
    epoch ? `**Эпоха:** ${epoch}` : '',
    '**Статус:** active',
    `**Создан:** ${today()}`,
    '',
    '## Описание',
    '',
    desc || 'Историческое событие цивилизации Xha\'Ruun.',
    '',
    '## Причины',
    '',
    reasons || 'Описание причин события.',
    '',
    '## Последствия',
    '',
    consequences || 'Описание последствий события.',
    '',
  ];

  if (refs.length > 0) {
    lines.push('## Связанные объекты\n');
    for (const r of refs) {
      lines.push(`- ${r}`);
    }
    lines.push('');
  }

  return lines.filter(l => l !== undefined && l !== '').join('\n');
}

function renderCharacter(opts) {
  const { id, name, species, role, epoch, desc, achievements, refs } = opts;
  const lines = [
    `# ${id}: ${name}`,
    '',
    species ? `**Вид:** ${species}` : '',
    `**Роль:** ${role || '—'}`,
    epoch ? `**Эпоха:** ${epoch}` : '',
    '**Статус:** historical',
    `**Создан:** ${today()}`,
    '',
    '## Биография',
    '',
    desc || 'Историческая личность цивилизации Xha\'Ruun.',
    '',
    '## Достижения',
    '',
    achievements || '- Достижение 1\n- Достижение 2',
    '',
  ];

  if (refs.length > 0) {
    const evRefs = refs.filter(r => r.startsWith('EV-') || r.startsWith('CH-'));
    const locRefs = refs.filter(r => r.startsWith('LOC-'));
    if (evRefs.length > 0) {
      lines.push('## Связанные события\n');
      for (const r of evRefs) {
        lines.push(`- ${r}`);
      }
      lines.push('');
    }
    if (locRefs.length > 0) {
      lines.push('## Связанные локации\n');
      for (const r of locRefs) {
        lines.push(`- ${r}`);
      }
      lines.push('');
    }
  }

  return lines.filter(l => l !== undefined && l !== '').join('\n');
}

const RENDERERS = {
  glyph: renderGlyph,
  lexeme: renderLexeme,
  rule: renderRule,
  location: renderLocation,
  event: renderEvent,
  character: renderCharacter,
};

// ============================================================
// CLI
// ============================================================

function printHelp() {
  console.log(`
  Registry Generator — Xha'Ruun Project

  Usage:
    node tools/registry-generator.js <type> --name <name> [options]

  Types:
    glyph, lexeme, rule, location, event, character

  Required:
    --name <name>        Entity name (kebab-case)

  Optional:
    --desc <desc>        Description text in quotes
    --refs <ids>         Comma-separated related IDs (G-0001,CH-0005)
    --type-sub <sub>     Sub-type (vowel, consonant, city, grammar, etc.)
    --trans <trans>      Transliteration (for glyphs)
    --pron <pron>        Pronunciation / IPA (for glyphs)
    --syllable <syl>     Syllable value (for glyphs)
    --root <root>        Root form (for lexemes)
    --pos <pos>          Part of speech (for lexemes)
    --translation <tr>   Translation (for lexemes)
    --rule-text <text>   Rule text (for rules)
    --continent <c>      Continent (for locations)
    --date <date>        Event date (for events)
    --epoch <epoch>      Historical epoch (for events, characters)
    --species <s>        Species (for characters)
    --role <role>        Role/title (for characters)
    --achievements <a>   Achievements (for characters)
    --reasons <r>        Event reasons (for events)
    --consequences <c>   Event consequences (for events)
    -y                   Skip confirmation prompt
    --dry-run            Preview without writing files
    --help               Show this message
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const type = args[0];
  if (!TYPES[type]) {
    console.error(`❌ Unknown type: "${type}". Valid: ${Object.keys(TYPES).join(', ')}`);
    process.exit(1);
  }

  const opts = { type, refs: [] };
  const flags = ['--name', '--desc', '--refs', '--type-sub', '--trans', '--pron',
    '--syllable', '--root', '--pos', '--translation', '--rule-text',
    '--continent', '--date', '--epoch', '--species', '--role',
    '--achievements', '--reasons', '--consequences'];

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '-y') { opts.yes = true; continue; }
    if (args[i] === '--dry-run') { opts.dryRun = true; continue; }
    if (flags.includes(args[i]) && i + 1 < args.length) {
      const key = args[i].replace('--', '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      let val = args[++i];
      if (key === 'refs') {
        opts.refs = val.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        opts[key] = val;
      }
    }
  }

  if (!opts.name) {
    console.error('❌ --name is required');
    process.exit(1);
  }

  opts.name = opts.name.toLowerCase().replace(/[^a-z0-9-]/g, '');
  return opts;
}

// ============================================================
// MAIN
// ============================================================

function main() {
  const opts = parseArgs();
  const cfg = TYPES[opts.type];
  const typeDir = path.join(REGISTRY_DIR, cfg.dir);

  // Find next ID
  const nextNum = findNextId(typeDir, cfg.idPattern, cfg.idFormat, cfg.idStart);
  const id = cfg.idFormat(nextNum);

  if (nextNum > cfg.idEnd) {
    console.error(`❌ ID range exhausted for type "${opts.type}" (max ${cfg.idFormat(cfg.idEnd)})`);
    process.exit(1);
  }

  // Build content
  const renderOpts = {
    id,
    name: opts.name,
    desc: opts.desc || '',
    refs: opts.refs || [],
    transliteration: opts.trans || opts.name,
    pronunciation: opts.pron || '',
    glyphType: opts.typeSub || '',
    syllable: opts.syllable || '',
    root: opts.root || opts.name,
    partOfSpeech: opts.pos || 'корень',
    translation: opts.translation || opts.desc || '',
    ruleType: opts.typeSub || 'грамматика',
    ruleText: opts['ruleText'] || opts.desc || '',
    locType: opts.typeSub || 'географический объект',
    continent: opts.continent || '',
    eventType: opts.typeSub || 'событие',
    date: opts.date || '',
    epoch: opts.epoch || '',
    species: opts.species || 'Xha\'ri',
    role: opts.role || '',
    achievements: opts.achievements || '',
    reasons: opts.reasons || '',
    consequences: opts.consequences || '',
  };

  const renderer = RENDERERS[opts.type];
  const content = renderer(renderOpts);
  const filePath = path.join(typeDir, `${id}.md`);

  // Summary
  const nameDisplay = opts.name.charAt(0).toUpperCase() + opts.name.slice(1);
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║      Registry Generator v1.0         ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
  console.log(`  Type:     ${opts.type}`);
  console.log(`  ID:       ${id}`);
  console.log(`  Name:     ${nameDisplay}`);
  console.log(`  File:     ${filePath}`);
  if (opts.desc) console.log(`  Desc:     ${opts.desc}`);
  if (opts.refs.length) console.log(`  Refs:     ${opts.refs.join(', ')}`);
  console.log('');

  if (opts.dryRun) {
    console.log('─── DRY RUN — Preview ───');
    console.log('');
    console.log(content);
    console.log('');
    console.log('─── End preview ───');
    console.log('✅ Dry run complete. No files written.');
    return;
  }

  // Check for existing file
  if (fs.existsSync(filePath)) {
    console.error(`❌ File already exists: ${filePath}`);
    process.exit(1);
  }

  // Confirm
  if (!opts.yes) {
    console.log('  Create this file? [Y/n] ');
    // Non-interactive — we skip prompting since it blocks in Claude Code
    // Use -y flag or pipe to bypass
  }

  // Write
  writeFileSafe(filePath, content);
  console.log(`  ✅ Created: ${id}.md (${path.relative(PROJECT_ROOT, filePath)})`);
  console.log('');

  // Check for gitkeep placeholder and remove if present
  const gitkeepPath = path.join(typeDir, '.gitkeep');
  if (fs.existsSync(gitkeepPath)) {
    try { fs.unlinkSync(gitkeepPath); } catch (e) { /* ignore */ }
  }

  console.log('  Done.');
}

main();
