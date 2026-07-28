const { mdToPdf } = require('md-to-pdf');
const path = require('path');

(async () => {
    console.log('Converting Xha-Ruun Encyclopedia to PDF...');

    const root = path.join(__dirname, '..');
    const pdf = await mdToPdf(
        { path: path.join(root, 'xharuun', 'build', 'full-encyclopedia.md') },
        {
            dest: path.join(root, 'xharuun', 'build', 'full-encyclopedia.pdf'),
            stylesheet: [path.join(root, 'xharuun', 'templates', 'print.css')],
            pdf_options: {
                format: 'A5',
                margin: { top: '18mm', bottom: '15mm', left: '15mm', right: '15mm' },
                printBackground: true,
                displayHeaderFooter: true,
                headerTemplate: '<div></div>',
                footerTemplate: '<div style="font-size:7.5pt;width:100%;padding:0 15mm;display:flex;justify-content:space-between;color:#8b6f4e;font-family:Georgia,serif;"><span>Xha\'Ruun · Том I: Вселенная</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'
            }
        }
    );

    console.log(`PDF created successfully: ${pdf.filename}`);
    console.log(`Size: ${(require('fs').statSync(pdf.filename).size / 1024 / 1024).toFixed(1)} MB`);
})().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
