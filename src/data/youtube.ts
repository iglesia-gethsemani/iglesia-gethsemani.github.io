export interface ChannelVideo {
  title: string;
  url: string;
  label: string;
  detail?: string;
}

export const regularVideos: ChannelVideo[] = [
  {
    title: 'Alabad',
    url: 'https://www.youtube.com/watch?v=wFzQMnFORgU',
    label: 'Culto de adoración',
    detail: 'Salmo 113 · X aniversario del Ensamble Musical Selah · 16 de agosto de 2026',
  },
  {
    title: 'Promesa de restauración y esperanza',
    url: 'https://www.youtube.com/watch?v=XvYqXVpmSv8',
    label: 'Culto de adoración',
    detail: '9 de agosto de 2026',
  },
  {
    title: 'Simón bar-Jona',
    url: 'https://www.youtube.com/watch?v=r04o3Rq9DDs',
    label: 'Sermón',
    detail: 'Mateo 4:18-20 · A.G. Enrique Jiménez Monzalvo',
  },
  {
    title: 'La murmuración',
    url: 'https://www.youtube.com/watch?v=O1HHTV9ncFs',
    label: 'Estudio bíblico',
    detail: '19 de julio de 2026 · 18:00 horas',
  },
  {
    title: 'Entre el cuidado y el abandono',
    url: 'https://www.youtube.com/watch?v=EI1yJ6ESY30',
    label: 'Sermón',
    detail: '1 Pedro 5:1–4 · Ps. Antonio Rodríguez',
  },
  {
    title: 'Tuyo es el Reino',
    url: 'https://www.youtube.com/watch?v=rRvvPgKTxvc',
    label: 'Música',
    detail: 'Coro Sión',
  },
  {
    title: 'Siempre te alabaré',
    url: 'https://www.youtube.com/watch?v=YuzNuRzr8vQ',
    label: 'Música',
    detail: 'Coro Sión',
  },
  {
    title: 'A Dios sea la Gloria',
    url: 'https://www.youtube.com/watch?v=mxz9SbCswJ8',
    label: 'Música',
    detail: 'Coro Sión',
  },
  {
    title: 'La clave hermenéutica de la Biblia',
    url: 'https://www.youtube.com/watch?v=YJFEjL4rfTQ',
    label: 'Conferencia',
    detail: 'Dr. Cristián Gómez Macías',
  },
  {
    title: 'La iglesia tendrá un avivamiento o un funeral',
    url: 'https://www.youtube.com/watch?v=cs3N-KrtZmQ',
    label: 'Conferencia',
    detail: 'Dr. Cristián Gómez Macías',
  },
  {
    title: 'Regocíjate en Cristo',
    url: 'https://www.youtube.com/watch?v=jNio8WGacXI',
    label: 'Sermón',
    detail: 'Filipenses 4:1–6 · Pastor Antonio Rodríguez',
  },
];

export const latestLiveVideo: ChannelVideo = {
  title: 'Alabad',
  url: 'https://www.youtube.com/watch?v=wFzQMnFORgU',
  label: 'Última transmisión',
  detail: '16 de agosto de 2026',
};

export const latestShortVideo: ChannelVideo = {
  title: '¿Buscas esperanza?',
  url: 'https://www.youtube.com/shorts/ZYrYp-3SIEs',
  label: 'Último Short',
};
