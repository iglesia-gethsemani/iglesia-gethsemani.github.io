/**
 * Sociedades y ministerios de la congregación.
 */
export interface Society {
  name: string;
  subtitle?: string;
  icon: 'people' | 'heart' | 'spark' | 'music' | 'faith' | 'church';
  /** Logo opcional (ruta desde /public). */
  logo?: string;
  roles: { label: string; names: string }[];
  order: number;
}

export const societies: Society[] = [
  {
    name: 'Sociedad de Jóvenes',
    subtitle: 'Redención Gratuita',
    icon: 'people',
    logo: '/images/sociedad-redencion-gratuita.png',
    roles: [
      { label: 'Presidenta', names: 'Nira Jimena Pérez' },
      { label: 'Consejeros', names: 'Israel Galicia y Edith Álvarez' },
    ],
    order: 1,
  },
  {
    name: 'Sociedad Femenil',
    subtitle: 'Eunice',
    icon: 'heart',
    roles: [
      { label: 'Presidenta', names: 'Damaris Ramírez' },
      { label: 'Consejero', names: 'Presbítero Antonio Rodríguez' },
    ],
    order: 2,
  },
  {
    name: 'Sociedad Infantil',
    icon: 'spark',
    roles: [{ label: 'Directora', names: 'Beatriz Noise' }],
    order: 3,
  },
  {
    name: 'Coro Sion y Ensamble Selah',
    icon: 'music',
    roles: [{ label: 'Directora', names: 'Karla Santiago' }],
    order: 4,
  },
  {
    name: 'Aposento de Oración',
    icon: 'faith',
    roles: [{ label: 'Responsable', names: 'Beatriz Noise' }],
    order: 5,
  },
  {
    name: 'Guardatemplos',
    icon: 'church',
    roles: [{ label: 'Responsables', names: 'Roberto Gómez y Edith Álvarez' }],
    order: 6,
  },
];
