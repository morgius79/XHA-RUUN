const { mdToPdf } = require('md-to-pdf');
const path = require('path');
const fs = require('fs');

(async () => {
    const root = path.join(__dirname, '..');
    const src = path.join(root, 'xharuun', 'sharuun', 'full-encyclopedia.md');
    const dest = path.join(root, 'xharuun', 'sharuun', 'full-encyclopedia.pdf');
    const fontSvg = path.join(root, 'xharuun', 'build', 'font', 'sharuu-font.svg');

    console.log('Converting Sha-Ruun Encyclopedia to PDF with TOC...');

    // Embed font as base64
    const fontData = fs.readFileSync(fontSvg, 'utf-8');
    const fontB64 = Buffer.from(fontData, 'utf-8').toString('base64');
    const fontDataUri = `data:image/svg+xml;base64,${fontB64}`;

    // Read source, generate TOC
    const content = fs.readFileSync(src, 'utf-8');
    const tocLines = [];
    const headingRegex = /^(#+)\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const title = match[2].replace(/\*\*/g, '').trim();
        if (level <= 3 && !title.includes('Условные') && !title.includes('Полный словарь')) {
            const indent = '  '.repeat(level - 1);
            tocLines.push(`${indent}- **${title}**`);
        }
    }

    const tocContent = `\n\n\\pagebreak\n\n# СОДЕРЖАНИЕ\n\n${tocLines.join('\n')}\n\n\\pagebreak\n\n`;

    const firstH1 = content.indexOf('\n# ');
    const modifiedContent = content.slice(0, firstH1 + 1) + tocContent + content.slice(firstH1 + 1);

    const pdf = await mdToPdf(
        { content: modifiedContent },
        {
            dest: dest,
            pdf_options: {
                format: 'A4',
                margin: { top: '20mm', bottom: '25mm', left: '15mm', right: '15mm' },
                printBackground: true,
                displayHeaderFooter: true,
                headerTemplate: '<div style="font-size:9px;text-align:center;width:100%;color:#888;padding-top:5px;">Sha-Ruun Encyclopedia — Xha\'Ruun-Vokh Thexen v1.0.0</div>',
                footerTemplate: '<div style="font-size:8px;text-align:center;width:100%;color:#888;">— Page <span class="pageNumber"></span> of <span class="totalPages"></span> —</div>',
                preferCSSPageSize: true
            },
            styles: {
                // Embedded Sha'Ruun font
                '@font-face': {
                    fontFamily: 'ShaRuun',
                    src: `url("${fontDataUri}") format('svg')`
                },
                body: 'font-family: "Segoe UI", Arial, sans-serif; font-size: 10.5pt; line-height: 1.5; color: #1a1a1a;',
                'h1, h2, h3, h4': 'font-family: "Georgia", "Times New Roman", serif;',
                h1: 'color: #8B4513; border-bottom: 2px solid #8B4513; padding-bottom: 4px; font-size: 18pt; text-align: center;',
                h2: 'color: #2a5a8c; font-size: 15pt; border-bottom: 1px solid #b0c4de; padding-bottom: 3px; margin-top: 25px;',
                h3: 'color: #3a7abc; font-size: 12pt; margin-top: 18px;',
                'blockquote': 'border-left: 4px solid #8B4513; padding: 8px 15px; margin: 15px 0; background: #faf6f0; color: #444; font-style: italic;',
                'pre, code': 'font-family: "Consolas", "Courier New", monospace; font-size: 8.5pt;',
                pre: 'background: #f8f4ef; border: 1px solid #d4c5a9; border-radius: 5px; padding: 12px; line-height: 1.3; overflow-x: auto; white-space: pre-wrap; word-break: break-word;',
                table: 'border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 9.5pt;',
                'th, td': 'border: 1px solid #b0a090; padding: 5px 8px; text-align: left;',
                th: 'background: #8B4513; color: white; font-weight: bold;',
                'tr:nth-child(even)': 'background: #f8f4ef;',
                a: 'color: #8B4513; text-decoration: underline;',
                hr: 'border: none; border-top: 1px solid #d4c5a9; margin: 20px 0;',
                // Sha'Ruun glyphs styling
                '.sharuu': `font-family: "ShaRuun", "Segoe UI", sans-serif; font-size: 14pt;`,
                '.sharuu-lg': `font-family: "ShaRuun", "Segoe UI", sans-serif; font-size: 24pt;`,
                '.glyph-table td': `font-family: "ShaRuun", "Segoe UI", sans-serif; font-size: 28pt; text-align: center; width: 80px;`
            },
            highlight_style: 'github',
            launch_options: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        }
    );

    // Also copy font alongside PDF for easy reference
    const fontDest = path.join(path.dirname(dest), 'sharuu-font.svg');
    fs.copyFileSync(fontSvg, fontDest);

    console.log(`PDF created: ${pdf.filename}`);
    const stats = fs.statSync(pdf.filename);
    console.log(`Size: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
    console.log(`Font embedded: ShaRuun (173 glyphs)`);
    console.log(`Font also saved to: ${fontDest}`);
})().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
