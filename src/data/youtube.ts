export interface ChannelVideo {
  title: string;
  url: string;
  label: string;
  detail?: string;
}

export const regularVideos: ChannelVideo[] = [
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
  {
    title: 'Festival Navideño 2025',
    url: 'https://www.youtube.com/watch?v=JiLvbqFk8H8',
    label: 'Programa especial',
  },
  {
    title: 'Beneficios de la gracia de Dios',
    url: 'https://www.youtube.com/watch?v=7Qo4gDPMQE0',
    label: 'Culto de adoración',
    detail: '21 de septiembre de 2025',
  },
];

export const latestLiveVideo: ChannelVideo = {
  title: 'Solemne Culto de Adoración',
  url: 'https://www.youtube.com/watch?v=yBbQsGKjouQ',
  label: 'Última transmisión',
  detail: '19 de julio de 2026',
};

export const latestShortVideo: ChannelVideo = {
  title: 'Invitación a la Escuela Bíblica de Vacaciones',
  url: 'https://www.youtube.com/shorts/xD-5DBRUq74',
  label: 'Último Short',
};
