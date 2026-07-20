/**
 * Extrae el ID de un video de YouTube desde distintos formatos de URL.
 */
export function getYouTubeId(url: string): string {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/').filter(Boolean);

    if (parsed.hostname === 'youtu.be') {
      return pathParts[0] ?? '';
    }

    if (['embed', 'shorts', 'live'].includes(pathParts[0] ?? '')) {
      return pathParts[1] ?? '';
    }

    return parsed.searchParams.get('v') ?? '';
  } catch {
    return '';
  }
}

export function getYouTubeEmbedUrl(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : '';
}

export function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}
