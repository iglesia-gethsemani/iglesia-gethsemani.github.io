/**
 * Fondos gratuitos (Unsplash License) + paletas diarias para la tarjeta del versículo.
 * Cada día rota imagen y colores. Si la imagen remota falla, se usa el degradado local.
 */
export interface SharePalette {
  deep: string;
  mid: string;
  accent: string;
  ink: string;
  muted: string;
}

export interface ShareBackground {
  unsplashId: string;
  palette: SharePalette;
}

const unsplashUrl = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1080&h=1350&q=80`;

/** Cielos, paisajes y luz — aptos para una tarjeta devocional. */
export const shareBackgrounds: ShareBackground[] = [
  {
    unsplashId: 'photo-1506905925346-21bda4d32df4',
    palette: { deep: '#1a2744', mid: '#2f4a6e', accent: '#d4b483', ink: '#f4f0e8', muted: '#c5ced8' },
  },
  {
    unsplashId: 'photo-1469474968028-56623f02e42e',
    palette: { deep: '#1c3328', mid: '#3a5c48', accent: '#c9b07a', ink: '#f3f1ea', muted: '#c7d0c8' },
  },
  {
    unsplashId: 'photo-1470071459604-3b5ec3a7fe05',
    palette: { deep: '#2a1f38', mid: '#4a3560', accent: '#e0b48a', ink: '#f7f1ea', muted: '#d0c6d6' },
  },
  {
    unsplashId: 'photo-1447752875215-b2761acb3c5d',
    palette: { deep: '#243528', mid: '#4a6b4e', accent: '#d7c08a', ink: '#f4f1e8', muted: '#c9d2c8' },
  },
  {
    unsplashId: 'photo-1472214103451-9374bd1c798e',
    palette: { deep: '#1e3a4c', mid: '#3d6a7e', accent: '#e2c28b', ink: '#f5f2ea', muted: '#c5d4dc' },
  },
  {
    unsplashId: 'photo-1500530855697-b586d89ba3ee',
    palette: { deep: '#3a2418', mid: '#6b4330', accent: '#e6c392', ink: '#f8f2e9', muted: '#ddcfc2' },
  },
  {
    unsplashId: 'photo-1418065460487-3e41a6c84dc5',
    palette: { deep: '#1b2e3a', mid: '#3d5a6c', accent: '#c9b896', ink: '#f2efe8', muted: '#c2ced6' },
  },
  {
    unsplashId: 'photo-1507525428034-b723cf961d3e',
    palette: { deep: '#16384a', mid: '#2f6f85', accent: '#f0d29a', ink: '#f7f4ec', muted: '#c7dbe3' },
  },
  {
    unsplashId: 'photo-1519681393784-d120267933ba',
    palette: { deep: '#1a2238', mid: '#38486a', accent: '#d8b98c', ink: '#f3f0e9', muted: '#c7cfe0' },
  },
  {
    unsplashId: 'photo-1464822759023-fed622ff2c3b',
    palette: { deep: '#2b2438', mid: '#564a6e', accent: '#e0b89a', ink: '#f6f1ea', muted: '#d2cbd8' },
  },
  {
    unsplashId: 'photo-1500534314209-a25ddb2bd429',
    palette: { deep: '#3b2118', mid: '#7a4a32', accent: '#efc48a', ink: '#f8f3ea', muted: '#e0d0c2' },
  },
  {
    unsplashId: 'photo-1493246507139-91e8fad9978e',
    palette: { deep: '#1f3040', mid: '#45657a', accent: '#dcc08c', ink: '#f4f1ea', muted: '#c8d5de' },
  },
];

export function getShareTheme(dayOfYear: number): ShareBackground & { imageUrl: string } {
  const index =
    ((dayOfYear - 1) % shareBackgrounds.length + shareBackgrounds.length) % shareBackgrounds.length;
  const theme = shareBackgrounds[index];
  return {
    ...theme,
    imageUrl: unsplashUrl(theme.unsplashId),
  };
}
