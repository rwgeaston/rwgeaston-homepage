import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import { load } from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteRoot = path.resolve(__dirname, '..');
const cvDataPath = path.join(siteRoot, 'src', 'data', 'cv.yaml');
const pdfOutputPath = path.join(siteRoot, 'public', 'cv', 'robert_easton_cv.pdf');

function formatDateRange(start, end) {
  if (!start && !end) {
    return '';
  }

  if (!start) {
    return end || '';
  }

  return `${start} - ${end || 'Present'}`;
}

function loadCvData() {
  const raw = fs.readFileSync(cvDataPath, 'utf8');
  return load(raw);
}

function ensurePageSpace(doc, requiredHeight = 56) {
  const bottomLimit = doc.page.height - doc.page.margins.bottom;
  if (doc.y + requiredHeight > bottomLimit) {
    doc.addPage();
  }
}

function writeSectionHeading(doc, heading) {
  ensurePageSpace(doc, 32);
  doc.moveDown(0.5);
  doc.font('Helvetica-Bold').fontSize(13).text(heading);
  doc.moveDown(0.2);
}

function writeBulletList(doc, items = []) {
  for (const item of items) {
    ensurePageSpace(doc, 20);
    doc.font('Helvetica').fontSize(10).text(`• ${item}`, {
      lineGap: 2,
      indent: 10
    });
  }
}

function generatePdf(cv) {
  fs.mkdirSync(path.dirname(pdfOutputPath), { recursive: true });

  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    info: {
      Title: `${cv.person.full_name} CV`,
      Author: cv.person.full_name
    }
  });

  doc.pipe(fs.createWriteStream(pdfOutputPath));

  doc.font('Helvetica-Bold').fontSize(22).text(cv.person.full_name);
  if (cv.person.headline) {
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(12).fillColor('#444444').text(cv.person.headline);
    doc.fillColor('black');
  }

  const contactParts = [cv.person.email, cv.person.phone, cv.person.location, cv.person.website].filter(Boolean);
  if (contactParts.length > 0) {
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(10).text(contactParts.join(' | '));
  }

  if (Array.isArray(cv.person.links) && cv.person.links.length > 0) {
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(10).text(cv.person.links.map((item) => `${item.label}: ${item.url}`).join(' | '));
  }

  writeSectionHeading(doc, 'Profile');
  doc.font('Helvetica').fontSize(11).text(cv.summary, { lineGap: 3 });

  writeSectionHeading(doc, 'Experience');
  for (const item of cv.experience || []) {
    ensurePageSpace(doc, 72);
    doc.font('Helvetica-Bold').fontSize(11).text(`${item.role} - ${item.company}`);
    const meta = [formatDateRange(item.start, item.end), item.location].filter(Boolean).join(' | ');
    if (meta) {
      doc.font('Helvetica').fontSize(10).fillColor('#555555').text(meta);
      doc.fillColor('black');
    }
    writeBulletList(doc, item.achievements || []);
    doc.moveDown(0.3);
  }

  writeSectionHeading(doc, 'Skills');
  for (const group of cv.skills || []) {
    ensurePageSpace(doc, 30);
    doc.font('Helvetica-Bold').fontSize(11).text(group.category);
    doc.font('Helvetica').fontSize(10).text((group.items || []).join(', '));
    doc.moveDown(0.2);
  }

  writeSectionHeading(doc, 'Education');
  for (const item of cv.education || []) {
    ensurePageSpace(doc, 40);
    doc.font('Helvetica-Bold').fontSize(11).text(`${item.qualification} - ${item.institution}`);
    const range = formatDateRange(item.start, item.end);
    if (range) {
      doc.font('Helvetica').fontSize(10).fillColor('#555555').text(range);
      doc.fillColor('black');
    }
    if (item.notes) {
      doc.font('Helvetica').fontSize(10).text(item.notes);
    }
    doc.moveDown(0.2);
  }

  if (Array.isArray(cv.projects) && cv.projects.length > 0) {
    writeSectionHeading(doc, 'Projects');
    for (const item of cv.projects) {
      ensurePageSpace(doc, 36);
      doc.font('Helvetica-Bold').fontSize(11).text(item.name);
      doc.font('Helvetica').fontSize(10).text(item.description, { lineGap: 2 });
      if (item.link) {
        doc.font('Helvetica').fontSize(10).fillColor('#1f4e79').text(item.link);
        doc.fillColor('black');
      }
      doc.moveDown(0.2);
    }
  }

  if (Array.isArray(cv.certifications) && cv.certifications.length > 0) {
    writeSectionHeading(doc, 'Certifications');
    for (const item of cv.certifications) {
      ensurePageSpace(doc, 24);
      const suffix = item.year ? ` (${item.year})` : '';
      doc.font('Helvetica').fontSize(10).text(`${item.name} - ${item.issuer}${suffix}`);
    }
  }

  doc.end();
}

const cv = loadCvData();
generatePdf(cv);
console.log(`Generated ${path.relative(siteRoot, pdfOutputPath)} from ${path.relative(siteRoot, cvDataPath)}`);
