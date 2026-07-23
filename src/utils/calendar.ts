export interface MexicoDateParts {
  year: number;
  month: number;
  day: number;
}

/** Partes de fecha en zona horaria de la Ciudad de México. */
export function getMexicoDateParts(date = new Date()): MexicoDateParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === 'year')?.value),
    month: Number(parts.find((part) => part.type === 'month')?.value),
    day: Number(parts.find((part) => part.type === 'day')?.value),
  };
}

/** Día del año (1–365/366) en zona horaria de la Ciudad de México. */
export function getDayOfYearMexico(date = new Date()): number {
  const { year, month, day } = getMexicoDateParts(date);
  const start = Date.UTC(year, 0, 0);
  const current = Date.UTC(year, month - 1, day);
  return Math.floor((current - start) / 86_400_000);
}

/** Día del plan (1–365): en años bisiestos el 29 feb y el 366 usan el tope del plan. */
export function getPlanDayMexico(date = new Date()): number {
  return Math.min(getDayOfYearMexico(date), 365);
}

/** Domingo (0) → sábado (6). */
export const WEEK_STARTS_ON = 0;

/** Domingo que inicia la semana (domingo a sábado). */
export function getWeekStartMexico(date = new Date()): MexicoDateParts {
  const { year, month, day } = getMexicoDateParts(date);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const offset = (weekday - WEEK_STARTS_ON + 7) % 7;
  const start = new Date(Date.UTC(year, month - 1, day - offset));
  return {
    year: start.getUTCFullYear(),
    month: start.getUTCMonth() + 1,
    day: start.getUTCDate(),
  };
}

export function addDaysToParts(parts: MexicoDateParts, days: number): MexicoDateParts {
  const next = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days));
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
}

export function formatDateMexico(date = new Date()): string {
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Formatea partes de calendario civil (sin desplazar por zona horaria local). */
function formatCalendarParts(
  parts: MexicoDateParts,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'UTC',
    ...options,
  }).format(new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12)));
}

export function formatPartsShort(parts: MexicoDateParts): string {
  return formatCalendarParts(parts, { day: 'numeric', month: 'short' });
}

export function weekdayNameEs(parts: MexicoDateParts): string {
  return formatCalendarParts(parts, { weekday: 'long' });
}

export function bibleGatewayUrl(reference: string): string {
  const query = encodeURIComponent(reference);
  return `https://www.biblegateway.com/passage/?search=${query}&version=RVR1960`;
}
