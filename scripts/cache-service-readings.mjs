import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ordersDir = path.join(root, 'dist/orden-del-culto');
const bibleOutputPath = path.join(root, 'src/data/bible-cache.json');
const hymnalOutputPath = path.join(root, 'src/data/hymnal-cache.json');
const bibleResources = {};
const hymnResources = {};

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(fullPath);
      continue;
    }
    if (entry.name !== 'index.html') continue;

    const html = fs.readFileSync(fullPath, 'utf8');
    const blocks = html.matchAll(
      /<script type="application\/json" data-service-resources>([\s\S]*?)<\/script>/g,
    );
    for (const block of blocks) {
      const parsed = JSON.parse(block[1]);
      for (const resource of Object.values(parsed)) {
        if (resource?.kind === 'scripture' && resource.verses?.length) {
          bibleResources[resource.id] = resource;
        }
        if (resource?.kind === 'hymn' && resource.stanzas?.length) {
          hymnResources[resource.id] = resource;
        }
      }
    }
  }
}

if (!fs.existsSync(ordersDir)) {
  throw new Error('Primero ejecuta npm run build para generar las lecturas.');
}

visit(ordersDir);
const orderedBible = Object.fromEntries(
  Object.entries(bibleResources).sort(([left], [right]) => left.localeCompare(right)),
);
const orderedHymns = Object.fromEntries(
  Object.entries(hymnResources).sort(([left], [right]) => left.localeCompare(right)),
);
fs.writeFileSync(bibleOutputPath, `${JSON.stringify(orderedBible, null, 2)}\n`);
fs.writeFileSync(hymnalOutputPath, `${JSON.stringify(orderedHymns, null, 2)}\n`);
console.log(
  `${Object.keys(orderedBible).length} lecturas y ${Object.keys(orderedHymns).length} himnos guardados localmente.`,
);
