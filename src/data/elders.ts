/**
 * Datos del consistorio.
 * La fotografía es opcional: si no hay imagen, la vista muestra un ícono de perfil.
 */
export interface Elder {
  name: string;
  role: string;
  /** Ruta relativa desde /public. Si se omite, se muestra un avatar genérico. */
  photo?: string;
  order: number;
}

export const elders: Elder[] = [
  {
    name: 'Antonio Rodríguez Álvarez',
    role: 'Presbítero · Anciano Docente (Presidente)',
    order: 1,
  },
  {
    name: 'Israel Galicia Reyes',
    role: 'Anciano Gobernante (Secretario)',
    order: 2,
  },
  {
    name: 'Efrén Haro Hernández',
    role: 'Anciano Gobernante (Tesorero)',
    order: 3,
  },
  {
    name: 'Hazael Córdova Ruiz',
    role: 'Anciano Gobernante',
    order: 4,
  },
  {
    name: 'Enrique Jimenez Montalvo',
    role: 'Anciano Gobernante',
    order: 5,
  },
  {
    name: 'Roberto Gómez',
    role: 'Director de Diáconos',
    order: 6,
  },
];
