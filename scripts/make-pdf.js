const { mdToPdf } = require('md-to-pdf');
const path = require('path');

(async () => {
    console.log('Converting Xha-Ruun Encyclopedia to PDF...');

    const root = path.join(__dirname, '..');
    const pdf = await mdToPdf(
        { path: path.join(root, 'xharuun', 'build', 'full-encyclopedia.md') },
        {
            dest: path.join(root, 'xharuun', 'build', 'full-encyclopedia.pdf'),
            pdf_options: {
                format: 'A4',
                margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
                printBackground: true,
                displayHeaderFooter: true,
                headerTemplate: '<div></div>',
                footerTemplate: '<div style="font-size:8px;text-align:center;width:100%;color:#888;">Xha-Ruun Encyclopedia v1.2.0 — Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
            },
            styles: {
                body: 'font-family: "Segoe UI", Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #222;',
                h1: 'color: #1a3a5c; border-bottom: 2px solid #1a3a5c; padding-bottom: 5px; font-size: 20pt;',
                h2: 'color: #2a5a8c; font-size: 16pt; margin-top: 20px;',
                h3: 'color: #3a7abc; font-size: 13pt;',
                'blockquote': 'border-left: 3px solid #5a8abc; padding-left: 15px; color: #555; font-style: italic;',
                'table, th, td': 'border: 1px solid #ccc; border-collapse: collapse; padding: 5px 8px;',
                th: 'background-color: #1a3a5c; color: white;',
                'tr:nth-child(even)': 'background-color: #f0f4f8;',
                pre: 'background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 4px; padding: 10px; font-size: 9pt; overflow-x: auto;',
                code: 'font-family: "Consolas", "Courier New", monospace; font-size: 9pt;',
                '.page-break': 'page-break-before: always;'
            }
        }
    );

    console.log(`PDF created successfully: ${pdf.filename}`);
    console.log(`Size: ${(require('fs').statSync(pdf.filename).size / 1024 / 1024).toFixed(1)} MB`);
})().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
