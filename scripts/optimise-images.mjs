// One-off image optimisation (run from the repo root: node scripts/optimise-images.mjs).
// Makes small logo/icon files from public/images/Logo.png (left in place) and shrinks
// speaker photos in place, same name and format, never upscaling.
import sharp from 'sharp';
import fs from 'node:fs';

sharp.cache(false);
const BG = '#FBF9F5'; // page ground, docs/DESIGN.md
const LOGO = 'public/images/Logo.png';
const size = (f) => fs.statSync(f).size;
const report = [];

async function out(file, pipeline) {
  await pipeline.toFile(file);
  report.push([file, '-', size(file)]);
}

const clear = { r: 0, g: 0, b: 0, alpha: 0 };
await out('public/images/favicon-32.png', sharp(LOGO).resize(32, 32, { fit: 'contain', background: clear }).png({ compressionLevel: 9, palette: true }));
await out('public/apple-touch-icon.png', sharp(LOGO).resize(156, 156, { fit: 'contain', background: BG }).extend({ top: 12, bottom: 12, left: 12, right: 12, background: BG }).flatten({ background: BG }).png({ compressionLevel: 9 }));
// Header shows the logo 36-44px tall, footer 36px: 2x = 88px tall.
await out('public/images/logo-header.png', sharp(LOGO).resize({ height: 88 }).png({ compressionLevel: 9, palette: true, quality: 90 }));
// Homepage watermark is 260px wide: 2x = 520px. Also the Organization logo in JSON-LD.
await out('public/images/logo-520.png', sharp(LOGO).resize({ width: 520 }).png({ compressionLevel: 9, palette: true, quality: 90 }));

// Speaker photos: largest display is 176px (team page), so 400px covers 2x.
const MAX = 400;
for (const name of fs.readdirSync('public/images/speakers')) {
  const f = `public/images/speakers/${name}`;
  const input = fs.readFileSync(f);
  const meta = await sharp(input).metadata();
  if (Math.max(meta.width, meta.height) <= MAX * 1.5) continue; // not far larger than needed
  const before = size(f);
  if (meta.format !== 'jpeg') throw new Error(`unexpected format ${f}`);
  const buf = await sharp(input).rotate().resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  fs.writeFileSync(f, buf);
  report.push([f, before, size(f)]);
}
console.table(report.map(([file, before, after]) => ({ file, before, after })));
