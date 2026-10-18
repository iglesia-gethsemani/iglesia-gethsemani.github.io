export interface WeeklyActivity {
  day: string;
  time: string;
  title: string;
}

export const weeklyActivities: WeeklyActivity[] = [
  { day: 'Miércoles', time: '17:00', title: 'Encuentro de la Sociedad Femenil “Eunice”' },
  { day: 'Jueves', time: '19:00', title: 'Solemne culto de oración y estudio bíblico' },
  { day: 'Sábado', time: '08:00', title: 'Ensayo del Coro Sión' },
  { day: 'Domingo', time: '09:30', title: 'Aposento de oración' },
  { day: 'Domingo', time: '10:30', title: 'Escuela Dominical Superior “Antioquía”' },
  { day: 'Domingo', time: '12:00', title: 'Solemne culto de adoración' },
  { day: 'Domingo', time: '14:00', title: 'Encuentro de la Sociedad de Jóvenes “Redención Gratuita”' },
  { day: 'Domingo', time: '18:00', title: 'Culto vespertino de adoración y estudio bíblico' },
];
