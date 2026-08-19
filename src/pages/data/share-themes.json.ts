import type { APIRoute } from 'astro';
import { shareBackgrounds } from '@/data/share-backgrounds';

export const prerender = true;

const unsplashUrl = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1080&h=1350&q=80`;

export const GET: APIRoute = () => {
  const body = {
    themes: shareBackgrounds.map((theme) => ({
      palette: theme.palette,
      imageUrl: unsplashUrl(theme.unsplashId),
    })),
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
