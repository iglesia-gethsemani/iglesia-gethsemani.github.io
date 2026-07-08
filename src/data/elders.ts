/**
 * Datos del consistorio.
 * Las fotografías provienen del respaldo en legacy-django/elders/.
 * Actualiza nombre y función según el consistorio vigente.
 */
export interface Elder {
  name: string;
  role: string;
  photo: string;
  order: number;
}

export const elders: Elder[] = [
  {
    name: 'Pendiente — actualizar nombre',
    role: 'Anciano gobernante',
    photo: '/images/elders/elder-1.png',
    order: 1,
  },
  {
    name: 'Pendiente — actualizar nombre',
    role: 'Anciano gobernante',
    photo: '/images/elders/elder-2.png',
    order: 2,
  },
];
