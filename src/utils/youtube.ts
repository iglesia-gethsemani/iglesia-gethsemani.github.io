/**
 * Extrae el ID de un video de YouTube desde distintos formatos de URL.
 */
export function getYouTubeId(url: string): string {
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1]?.split('?')[0] ?? '';
  }

  if (url.includes('youtube.com/embed/')) {
    return url.split('embed/')[1]?.split('?')[0] ?? '';
  }

  try {
    const parsed = new URL(url);
    const videoId = parsed.searchParams.get('v');
    return videoId ?? '';
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
