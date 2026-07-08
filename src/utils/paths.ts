/** Genera una ruta interna respetando la base de GitHub Pages. */
export function pathFor(href: string): string {
  if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:')) {
    return href;
  }

  const base = import.meta.env.BASE_URL;
  const normalized = href.startsWith('/') ? href.slice(1) : href;
  return `${base}${normalized}`;
}
