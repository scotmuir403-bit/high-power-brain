import { createWriteStream, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const assets = [
  // Logo
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/2025/12/Mask-group-1.png', dest: 'images/logo.png' },
  // Hero
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/2026/01/IMG_4389-687x1024.jpeg', dest: 'images/hero-product.jpeg' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/2025/12/image-11-1.png', dest: 'images/hero-decorative.png' },
  // Sections
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/2025/11/image-2.png', dest: 'images/vip-background.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/2025/11/Your-paragraph-text-1-2.png', dest: 'images/footer-tagline.png' },
  // Products
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/2026/01/87120-0-300x300.png', dest: 'images/products/ring-87120.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/2026/01/90680-0-300x300.jpg', dest: 'images/products/necklace-90680.jpg' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/2026/01/87722-0-300x300.png', dest: 'images/products/bracelet-87722.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/2026/01/87638-0-300x300.png', dest: 'images/products/bracelet-87638.png' },
  // Gallery
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/elementor/thumbs/Necklacee-rhcqllof5v7zgh998piwowf7d2gjq1l5csosp8s6m8.png', dest: 'images/gallery/necklace.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/elementor/thumbs/Gemini_Generated_Image_s4d89us4d89us4d8-rhcqlhx2ej2u61epunweexdcziz2v9680a2us4xrb4.png', dest: 'images/gallery/model.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/elementor/thumbs/Bracelet-rhcqlca19iv48dmwrlgmzyslf7qvl2jtzi5xwh64cg.png', dest: 'images/gallery/bracelet-1.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/elementor/thumbs/Earingss-rhcql7kubcoombtqj1fi5hzagae1il16auwii3d37k.png', dest: 'images/gallery/earrings.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/elementor/thumbs/87120-0-rhcqq4ai07el90p1v5td69dy4q71poipn5jsq432ps.png', dest: 'images/gallery/ring-87120.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/elementor/thumbs/87722-0-rhcqq0j58v9fykuih46uwac3r6pkuw3samxut08neo.png', dest: 'images/gallery/bracelet-87722.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/elementor/thumbs/87312-0-rhcqpwrshj4ao4zz32kcmba9dn8403ouy4bwvwe83k.png', dest: 'images/gallery/bracelet-87312.png' },
  { url: 'https://rochelledemaya.co.uk/wp-content/uploads/elementor/thumbs/87638-0-rhcqpt0fq6z5dp5fp0xucc8f03qn5b9xllpyysjssg.png', dest: 'images/gallery/bracelet-87638.png' },
  // SVG icons
  { url: 'https://rochelledemaya.co.uk/wp-content/themes/astra-child/icons/email.svg', dest: 'images/icons/email.svg' },
];

function download(url, destRel) {
  const dest = join(PUBLIC, destRel);
  mkdirSync(dirname(dest), { recursive: true });
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, destRel).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(destRel); });
    }).on('error', (err) => { reject(err); });
  });
}

async function run() {
  const batch = 4;
  for (let i = 0; i < assets.length; i += batch) {
    const chunk = assets.slice(i, i + batch);
    const results = await Promise.allSettled(chunk.map(a => download(a.url, a.dest)));
    results.forEach((r, j) => {
      if (r.status === 'fulfilled') console.log(`✓ ${chunk[j].dest}`);
      else console.error(`✗ ${chunk[j].dest}: ${r.reason?.message}`);
    });
  }
  console.log('Done.');
}

run();
