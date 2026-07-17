const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const path = require('path');

async function buildPdf() {
  const mdPath = path.resolve(__dirname, '..', 'volumes', 'build', 'volume-1-full.md');
  const pdfPath = path.resolve(__dirname, '..', 'volumes', 'build', 'Volume-I-Universe.pdf');
  const cssPath = path.resolve(__dirname, '..', 'xharuun', 'templates', 'print.css');

  try {
    const pdf = await mdToPdf(
      { path: mdPath },
      {
        pdf_options: {
          format: 'A5',
          margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
          printBackground: true,
        },
        stylesheet: [cssPath],
        body_class: ['volume-print'],
      }
    );

    fs.writeFileSync(pdfPath, pdf.content);
    console.log(`✓ PDF written: ${pdfPath}`);
    console.log(`  Size: ${(pdf.content.length / 1024).toFixed(0)} KB`);
  } catch (err) {
    console.error(`✗ PDF failed: ${err.message}`);
    process.exit(1);
  }
}

buildPdf();
