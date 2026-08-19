import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const targets = [
  join('dist', 'styles', 'global.css'),
  join('dist', 'styles', 'fonts.css'),
];

function minifyCss(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

for (const file of targets) {
  if (!existsSync(file)) continue;
  const before = readFileSync(file, 'utf8');
  const after = minifyCss(before);
  writeFileSync(file, after);
  const saved = before.length - after.length;
  console.log(`minified ${file}: ${before.length} → ${after.length} (−${saved} B)`);
}
