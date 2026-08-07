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

export const shareBackgrounds: ShareBackground[] = [
  {
    unsplashId: 'photo-1506905925346-21bda4d32df4',
    palette: { deep: '#121c30', mid: '#2f4a6e', accent: '#d4b483', ink: '#f4f0e8', muted: '#c5ced8' },
  },
  {
    unsplashId: 'photo-1469474968028-56623f02e42e',
    palette: { deep: '#14241c', mid: '#3a5c48', accent: '#c9b07a', ink: '#f3f1ea', muted: '#c7d0c8' },
  },
  {
    unsplashId: 'photo-1470071459604-3b5ec3a7fe05',
    palette: { deep: '#1e1628', mid: '#4a3560', accent: '#e0b48a', ink: '#f7f1ea', muted: '#d0c6d6' },
  },
  {
    unsplashId: 'photo-1447752875215-b2761acb3c5d',
    palette: { deep: '#19261c', mid: '#4a6b4e', accent: '#d7c08a', ink: '#f4f1e8', muted: '#c9d2c8' },
  },
  {
    unsplashId: 'photo-1472214103451-9374bd1c798e',
    palette: { deep: '#152936', mid: '#3d6a7e', accent: '#e2c28b', ink: '#f5f2ea', muted: '#c5d4dc' },
  },
  {
    unsplashId: 'photo-1500530855697-b586d89ba3ee',
    palette: { deep: '#291911', mid: '#6b4330', accent: '#e6c392', ink: '#f8f2e9', muted: '#ddcfc2' },
  },
  {
    unsplashId: 'photo-1418065460487-3e41a6c84dc5',
    palette: { deep: '#132129', mid: '#3d5a6c', accent: '#c9b896', ink: '#f2efe8', muted: '#c2ced6' },
  },
  {
    unsplashId: 'photo-1507525428034-b723cf961d3e',
    palette: { deep: '#0f2835', mid: '#2f6f85', accent: '#f0d29a', ink: '#f7f4ec', muted: '#c7dbe3' },
  },
  {
    unsplashId: 'photo-1519681393784-d120267933ba',
    palette: { deep: '#121828', mid: '#38486a', accent: '#d8b98c', ink: '#f3f0e9', muted: '#c7cfe0' },
  },
  {
    unsplashId: 'photo-1464822759023-fed622ff2c3b',
    palette: { deep: '#1e1928', mid: '#564a6e', accent: '#e0b89a', ink: '#f6f1ea', muted: '#d2cbd8' },
  },
  {
    unsplashId: 'photo-1500534314209-a25ddb2bd429',
    palette: { deep: '#2a1711', mid: '#7a4a32', accent: '#efc48a', ink: '#f8f3ea', muted: '#e0d0c2' },
  },
  {
    unsplashId: 'photo-1493246507139-91e8fad9978e',
    palette: { deep: '#16222e', mid: '#45657a', accent: '#dcc08c', ink: '#f4f1ea', muted: '#c8d5de' },
  },
  {
    unsplashId: 'photo-1475924156734-496f6cac6ec1',
    palette: { deep: '#12262e', mid: '#3a6675', accent: '#e2c9a0', ink: '#f5f2eb', muted: '#c5d5db' },
  },
  {
    unsplashId: 'photo-1439066615861-d1af74d74000',
    palette: { deep: '#142131', mid: '#3f5f82', accent: '#d5bc8e', ink: '#f3f0e9', muted: '#c4d0de' },
  },
  {
    unsplashId: 'photo-1501785888041-af3ef285b470',
    palette: { deep: '#151e19', mid: '#3f5648', accent: '#d0b88a', ink: '#f4f1ea', muted: '#c8d1cb' },
  },
  {
    unsplashId: 'photo-1470770841072-f978cf4d019e',
    palette: { deep: '#19222e', mid: '#4a5f78', accent: '#e0c49a', ink: '#f6f2ea', muted: '#cad3de' },
  },
  {
    unsplashId: 'photo-1441974231531-c6227db76b6e',
    palette: { deep: '#16261c', mid: '#456b52', accent: '#cbb887', ink: '#f3f0e8', muted: '#c5d0c8' },
  },
  {
    unsplashId: 'photo-1502082553048-f009c37129b9',
    palette: { deep: '#1f1911', mid: '#5c4a32', accent: '#e8c98e', ink: '#f8f3ea', muted: '#ddd0c0' },
  },
  {
    unsplashId: 'photo-1518495973542-4542c06a5843',
    palette: { deep: '#1e141c', mid: '#5a3d52', accent: '#e2b894', ink: '#f7f1ea', muted: '#d6c8d0' },
  },
  {
    unsplashId: 'photo-1465146633011-14f8e0781093',
    palette: { deep: '#211611', mid: '#6a4630', accent: '#efc99a', ink: '#f8f3ea', muted: '#e0d0c2' },
  },
  {
    unsplashId: 'photo-1506744038136-46273834b3fb',
    palette: { deep: '#122228', mid: '#3d6470', accent: '#d8bf90', ink: '#f4f1ea', muted: '#c5d4d8' },
  },
  {
    unsplashId: 'photo-1433086966358-54859d0ed716',
    palette: { deep: '#141c22', mid: '#3a5560', accent: '#c9b48a', ink: '#f2efe8', muted: '#c2ced4' },
  },
  {
    unsplashId: 'photo-1470252649378-9c29740c9fa8',
    palette: { deep: '#291c11', mid: '#7a5530', accent: '#f0c98a', ink: '#f8f3e9', muted: '#e2d0bc' },
  },
  {
    unsplashId: 'photo-1506260408121-e353d10b87c7',
    palette: { deep: '#151c28', mid: '#425870', accent: '#d4b892', ink: '#f4f1ea', muted: '#c6d0dc' },
  },
  {
    unsplashId: 'photo-1518837695005-2083093ee35b',
    palette: { deep: '#0e212b', mid: '#2f6478', accent: '#e8c89a', ink: '#f6f3ec', muted: '#c4d8e0' },
  },
  {
    unsplashId: 'photo-1482192505345-5655af888cc4',
    palette: { deep: '#181c22', mid: '#4a5560', accent: '#d0b890', ink: '#f3f0e9', muted: '#c8ced4' },
  },
  {
    unsplashId: 'photo-1494500764479-0c8f2919a3d8',
    palette: { deep: '#121c2e', mid: '#3a5478', accent: '#dcc08c', ink: '#f4f1ea', muted: '#c5d0e0' },
  },
  {
    unsplashId: 'photo-1511593358241-7eea1f3c84f5',
    palette: { deep: '#112228', mid: '#3a6870', accent: '#e0c8a0', ink: '#f5f2eb', muted: '#c6d8dc' },
  },
  {
    unsplashId: 'photo-1454496522488-7a8e488e8606',
    palette: { deep: '#1e1928', mid: '#524a68', accent: '#e2b8a0', ink: '#f6f1ea', muted: '#d2ccd8' },
  },
  {
    unsplashId: 'photo-1483728642387-6c3bddfbaadc',
    palette: { deep: '#141922', mid: '#3e4e62', accent: '#d6bc8e', ink: '#f3f0e9', muted: '#c6d0da' },
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
