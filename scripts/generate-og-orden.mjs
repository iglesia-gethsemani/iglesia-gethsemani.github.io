/**
 * Genera la imagen Open Graph del orden del culto vigente (culto 12:00).
 * Se ejecuta en prebuild para que WhatsApp/Facebook muestren el contenido del culto.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const ordersDir = path.join(root, 'src/content/service-orders');
const outPath = path.join(root, 'public/images/og/orden-del-culto.jpg');
const logoPath = path.join(root, 'public/images/logo-gethsemani.png');

const WIDTH = 1200;
const HEIGHT = 630;

function dayKey(date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function truncate(text, max) {
  const s = String(text ?? '').trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1).trimEnd()}…`;
}

function loadOrders() {
  return fs
    .readdirSync(ordersDir)
    .filter((name) => name.endsWith('.md') && !name.startsWith('plantilla'))
    .map((name) => {
      const raw = fs.readFileSync(path.join(ordersDir, name), 'utf8');
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!match) return null;
      const data = parseYaml(match[1]);
      if (!data || data.published === false) return null;
      return {
        id: name.replace(/\.md$/, ''),
        ...data,
        date: new Date(data.date),
        time: String(data.time ?? '12:00'),
        elements: Array.isArray(data.elements) ? data.elements : [],
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

function pickCurrentOrder(orders) {
  if (!orders.length) return null;
  const currentDay = dayKey(orders[0].date);
  const sameDay = orders.filter((o) => dayKey(o.date) === currentDay);
  return sameDay.find((o) => o.time === '12:00') ?? sameDay[0] ?? orders[0];
}

function buildSvg(order, logoDataUri) {
  const dateLabel = new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(order.date);

  const meta = `${dateLabel} · ${order.time} h`;
  const title = truncate(order.title, 48);
  const theme = truncate(order.theme ?? '', 78);
  const sermonLine = [order.sermonTitle, order.sermonPassage].filter(Boolean).join(' · ');
  const preacher = truncate(order.preacher ?? '', 52);

  const hasSermonBlock = Boolean(theme || sermonLine || preacher);
  const headerBottom = hasSermonBlock ? 300 : 200;
  const listStart = headerBottom + 36;
  const rowH = 34;
  const maxItems = Math.max(0, Math.min(9, Math.floor((HEIGHT - 100 - listStart) / rowH)));
  const items = order.elements.slice(0, maxItems);
  const more = order.elements.length - items.length;

  let y = listStart;
  const itemLines = items
    .map((el) => {
      const label = truncate(el.label ?? '', 14).toUpperCase();
      const detail = el.detail ? ` — ${el.detail}` : '';
      const body = truncate(`${el.title ?? ''}${detail}`, 58);
      const line = `
        <text x="72" y="${y}" fill="#835f34" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="0.08em">${escapeXml(label)}</text>
        <text x="250" y="${y}" fill="#252a27" font-family="Georgia, 'Times New Roman', serif" font-size="22">${escapeXml(body)}</text>`;
      y += rowH;
      return line;
    })
    .join('');

  const moreLine =
    more > 0
      ? `<text x="250" y="${y}" fill="#686d69" font-family="Arial, Helvetica, sans-serif" font-size="16">+ ${more} elementos más</text>`
      : '';

  const sermonY = theme ? 246 : 210;
  const preacherY = theme ? (sermonLine ? 278 : 246) : sermonLine ? 242 : 210;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f7f4ec"/>
      <stop offset="55%" stop-color="#f3f0e9"/>
      <stop offset="100%" stop-color="#ebe4d6"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#091926"/>
      <stop offset="100%" stop-color="#1a2f3f"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${WIDTH}" height="18" fill="url(#bar)"/>
  <rect x="0" y="${HEIGHT - 78}" width="${WIDTH}" height="78" fill="url(#bar)"/>

  <text x="72" y="58" fill="#835f34" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="800" letter-spacing="0.2em">ORDEN DEL CULTO</text>
  <text x="72" y="108" fill="#252b28" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="600">${escapeXml(title)}</text>
  <text x="72" y="148" fill="#414943" font-family="Arial, Helvetica, sans-serif" font-size="20">${escapeXml(meta)}</text>

  <line x1="72" y1="172" x2="1128" y2="172" stroke="#ded9d0" stroke-width="2"/>

  ${theme ? `<text x="72" y="210" fill="#657169" font-family="Georgia, 'Times New Roman', serif" font-size="20" font-style="italic">${escapeXml(theme)}</text>` : ''}
  ${sermonLine ? `<text x="72" y="${sermonY}" fill="#252b28" font-family="Georgia, 'Times New Roman', serif" font-size="24" font-weight="600">${escapeXml(truncate(sermonLine, 70))}</text>` : ''}
  ${preacher ? `<text x="72" y="${preacherY}" fill="#686d69" font-family="Arial, Helvetica, sans-serif" font-size="18">${escapeXml(preacher)}</text>` : ''}

  <line x1="72" y1="${headerBottom}" x2="1128" y2="${headerBottom}" stroke="#ded9d0" stroke-width="2"/>

  ${itemLines}
  ${moreLine}

  ${logoDataUri ? `<image href="${logoDataUri}" x="72" y="${HEIGHT - 62}" width="42" height="42" preserveAspectRatio="xMidYMid meet"/>` : ''}
  <text x="${logoDataUri ? 128 : 72}" y="${HEIGHT - 42}" fill="#e6dcc6" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="600">Gethsemaní</text>
  <text x="${logoDataUri ? 128 : 72}" y="${HEIGHT - 20}" fill="#b28a55" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" letter-spacing="0.08em">IGLESIA PRESBITERIANA REFORMADA</text>
</svg>`;
}

async function main() {
  const orders = loadOrders();
  const order = pickCurrentOrder(orders);
  if (!order) {
    console.warn('No hay órdenes del culto publicadas; se omite OG.');
    process.exit(0);
  }

  let logoDataUri = '';
  if (fs.existsSync(logoPath)) {
    const buf = fs.readFileSync(logoPath);
    logoDataUri = `data:image/png;base64,${buf.toString('base64')}`;
  }

  const svg = buildSvg(order, logoDataUri);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);

  const sizeKb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`OG orden del culto → ${path.relative(root, outPath)} (${sizeKb} KB) · ${order.id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
