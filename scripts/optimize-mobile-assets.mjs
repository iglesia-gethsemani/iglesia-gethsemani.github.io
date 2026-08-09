import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const variants = [
  {
    input: 'public/images/templo-gethsemani.jpg',
    outputs: [
      ['public/images/optimized/templo-gethsemani-640.webp', 640],
      ['public/images/optimized/templo-gethsemani-1024.webp', 1024],
      ['public/images/optimized/templo-gethsemani-1600.webp', 1600],
    ],
    quality: 72,
  },
  {
    input: 'public/images/logo-gethsemani.png',
    outputs: [
      ['public/images/optimized/logo-gethsemani-120.webp', 120],
      ['public/images/optimized/logo-gethsemani-240.webp', 240],
    ],
    quality: 82,
  },
  {
    input: 'public/images/sermons/nada-me-faltara-salmo-23.jpg',
    outputs: [
      ['public/images/optimized/nada-me-faltara-salmo-23-640.webp', 640],
      ['public/images/optimized/nada-me-faltara-salmo-23-960.webp', 960],
      ['public/images/optimized/nada-me-faltara-salmo-23-1280.webp', 1280],
    ],
    quality: 86,
  },
  {
    input: 'public/images/sermons/promesa-restauracion-esperanza-ezequiel-37.jpg',
    outputs: [
      ['public/images/optimized/promesa-restauracion-esperanza-ezequiel-37-640.webp', 640],
      ['public/images/optimized/promesa-restauracion-esperanza-ezequiel-37-960.webp', 960],
      ['public/images/optimized/promesa-restauracion-esperanza-ezequiel-37-1280.webp', 1280],
    ],
    quality: 86,
  },
  {
    input: 'public/images/sociedad-redencion-gratuita.png',
    outputs: [
      ['public/images/optimized/sociedad-redencion-gratuita-480.webp', 480],
      ['public/images/optimized/sociedad-redencion-gratuita-800.webp', 800],
    ],
    quality: 76,
  },
  {
    input: 'public/images/anuario-2026/page-01.png',
    outputs: [['public/images/optimized/anuario-2026-portada.webp', 910]],
    quality: 76,
  },
  {
    input: 'public/images/libro-orden-presbiteriano/page-01.png',
    outputs: [['public/images/optimized/libro-orden-portada.webp', 935]],
    quality: 76,
  },
  {
    input: 'public/images/historia/capilla-mcmurtrie-1904.jpg',
    outputs: [['public/images/optimized/capilla-mcmurtrie-1904.webp', 768]],
    quality: 74,
  },
  {
    input: 'public/images/historia/seminario-capilla-1907.jpg',
    outputs: [['public/images/optimized/seminario-capilla-1907.webp', 1024]],
    quality: 74,
  },
  {
    input: 'public/images/historia/reparacion-torre-2001.jpg',
    outputs: [['public/images/optimized/reparacion-torre-2001.webp', 768]],
    quality: 74,
  },
];

for (const variant of variants) {
  for (const [output, width] of variant.outputs) {
    const outputPath = path.join(root, output);
    await sharp(path.join(root, variant.input))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: variant.quality, effort: 6 })
      .toFile(outputPath);
  }
}

console.log('Imágenes móviles optimizadas.');
