/** Deriva srcset WebP optimizado a partir de la ruta del JPG del sermón. */
export function sermonImageWebpSrcset(
  sermonImage: string | undefined,
  base: string,
): string | null {
  if (!sermonImage || sermonImage.startsWith('http')) return null;

  const file = sermonImage.split('/').pop() ?? '';
  const stem = file.replace(/\.(jpe?g|png|webp)$/i, '');
  if (!stem) return null;

  return `${base}images/optimized/${stem}-640.webp 640w, ${base}images/optimized/${stem}-960.webp 960w, ${base}images/optimized/${stem}-1280.webp 1280w`;
}
