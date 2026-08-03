import { bibleGatewayUrl } from './calendar';
import cachedReadings from '@/data/bible-cache.json';

export interface ParsedBibleRef {
  /** Texto original, p. ej. "Mateo 4:18-20" */
  reference: string;
  /** Slug Midvash, p. ej. "mateo" o "2-corintios" */
  bookSlug: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
}

export interface BiblePassageContent {
  id: string;
  kind: 'scripture';
  title: string;
  subtitle: string;
  verses: { number: number; text: string }[];
  apiUrl: string;
  source: string;
  externalUrl: string;
}

/** Alias en español → slug Midvash (acepta acentos y abreviaturas comunes). */
const BOOK_ALIASES: Array<{ aliases: string[]; slug: string }> = [
  { aliases: ['génesis', 'genesis', 'gn', 'gen'], slug: 'genesis' },
  { aliases: ['éxodo', 'exodo', 'ex', 'exo'], slug: 'exodo' },
  { aliases: ['levítico', 'levitico', 'lv', 'lev'], slug: 'levitico' },
  { aliases: ['números', 'numeros', 'nm', 'num'], slug: 'numeros' },
  { aliases: ['deuteronomio', 'dt', 'deut'], slug: 'deuteronomio' },
  { aliases: ['josué', 'josue', 'jos'], slug: 'josue' },
  { aliases: ['jueces', 'jue', 'juec'], slug: 'jueces' },
  { aliases: ['rut'], slug: 'rut' },
  { aliases: ['1 samuel', '1samuel', '1 sam', '1sam', '1 s'], slug: '1-samuel' },
  { aliases: ['2 samuel', '2samuel', '2 sam', '2sam', '2 s'], slug: '2-samuel' },
  { aliases: ['1 reyes', '1reyes', '1 re', '1re', '1 r'], slug: '1-reyes' },
  { aliases: ['2 reyes', '2reyes', '2 re', '2re', '2 r'], slug: '2-reyes' },
  { aliases: ['1 crónicas', '1 cronicas', '1crónicas', '1cronicas', '1 cr', '1cr'], slug: '1-cronicas' },
  { aliases: ['2 crónicas', '2 cronicas', '2crónicas', '2cronicas', '2 cr', '2cr'], slug: '2-cronicas' },
  { aliases: ['esdras', 'esd'], slug: 'esdras' },
  { aliases: ['nehemías', 'nehemias', 'neh'], slug: 'nehemias' },
  { aliases: ['ester', 'est'], slug: 'ester' },
  { aliases: ['job'], slug: 'job' },
  { aliases: ['salmo', 'salmos', 'sal', 'sl'], slug: 'salmos' },
  { aliases: ['proverbios', 'prv', 'prov', 'pr'], slug: 'proverbios' },
  { aliases: ['eclesiastés', 'eclesiastes', 'ec', 'ecl'], slug: 'eclesiastes' },
  { aliases: ['cantares', 'cantar de los cantares', 'cnt', 'ct'], slug: 'cantares' },
  { aliases: ['isaías', 'isaias', 'is', 'isa'], slug: 'isaias' },
  { aliases: ['jeremías', 'jeremias', 'jer'], slug: 'jeremias' },
  { aliases: ['lamentaciones', 'lam'], slug: 'lamentaciones' },
  { aliases: ['ezequiel', 'ez', 'ezeq'], slug: 'ezequiel' },
  { aliases: ['daniel', 'dn', 'dan'], slug: 'daniel' },
  { aliases: ['oseas', 'os'], slug: 'oseas' },
  { aliases: ['joel', 'jl'], slug: 'joel' },
  { aliases: ['amós', 'amos', 'am'], slug: 'amos' },
  { aliases: ['abdías', 'abdias', 'abd'], slug: 'abdias' },
  { aliases: ['jonás', 'jonas', 'jon'], slug: 'jonas' },
  { aliases: ['miqueas', 'miq', 'mi'], slug: 'miqueas' },
  { aliases: ['nahúm', 'nahum', 'nah'], slug: 'nahum' },
  { aliases: ['habacuc', 'hab'], slug: 'habacuc' },
  { aliases: ['sofonías', 'sofonias', 'sof'], slug: 'sofonias' },
  { aliases: ['hageo', 'hag'], slug: 'hageo' },
  { aliases: ['zacarías', 'zacarias', 'zac'], slug: 'zacarias' },
  { aliases: ['malaquías', 'malaquias', 'mal'], slug: 'malaquias' },
  { aliases: ['mateo', 'mt', 'mat'], slug: 'mateo' },
  { aliases: ['marcos', 'mr', 'mc', 'mar'], slug: 'marcos' },
  { aliases: ['lucas', 'lc', 'luc'], slug: 'lucas' },
  { aliases: ['juan', 'jn', 'jua'], slug: 'juan' },
  { aliases: ['hechos', 'hch', 'act'], slug: 'hechos' },
  { aliases: ['romanos', 'ro', 'rom'], slug: 'romanos' },
  { aliases: ['1 corintios', '1corintios', '1 co', '1co', '1 cor'], slug: '1-corintios' },
  { aliases: ['2 corintios', '2corintios', '2 co', '2co', '2 cor'], slug: '2-corintios' },
  { aliases: ['gálatas', 'galatas', 'ga', 'gal'], slug: 'galatas' },
  { aliases: ['efesios', 'ef', 'efes'], slug: 'efesios' },
  { aliases: ['filipenses', 'fil', 'flp', 'filip'], slug: 'filipenses' },
  { aliases: ['colosenses', 'col'], slug: 'colosenses' },
  { aliases: ['1 tesalonicenses', '1tesalonicenses', '1 ts', '1ts', '1 tes'], slug: '1-tesalonicenses' },
  { aliases: ['2 tesalonicenses', '2tesalonicenses', '2 ts', '2ts', '2 tes'], slug: '2-tesalonicenses' },
  { aliases: ['1 timoteo', '1timoteo', '1 ti', '1ti', '1 tim'], slug: '1-timoteo' },
  { aliases: ['2 timoteo', '2timoteo', '2 ti', '2ti', '2 tim'], slug: '2-timoteo' },
  { aliases: ['tito', 'tit'], slug: 'tito' },
  { aliases: ['filemón', 'filemon', 'flm', 'flmón'], slug: 'filemon' },
  { aliases: ['hebreos', 'he', 'heb'], slug: 'hebreos' },
  { aliases: ['santiago', 'stg', 'sant', 'st'], slug: 'santiago' },
  { aliases: ['1 pedro', '1pedro', '1 pe', '1pe', '1 ped'], slug: '1-pedro' },
  { aliases: ['2 pedro', '2pedro', '2 pe', '2pe', '2 ped'], slug: '2-pedro' },
  { aliases: ['1 juan', '1juan', '1 jn', '1jn'], slug: '1-juan' },
  { aliases: ['2 juan', '2juan', '2 jn', '2jn'], slug: '2-juan' },
  { aliases: ['3 juan', '3juan', '3 jn', '3jn'], slug: '3-juan' },
  { aliases: ['judas', 'jud'], slug: 'judas' },
  { aliases: ['apocalipsis', 'ap', 'apo', 'apoc'], slug: 'apocalipsis' },
];

function normalizeKey(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const ALIAS_TO_SLUG = new Map<string, string>();
for (const entry of BOOK_ALIASES) {
  for (const alias of entry.aliases) {
    ALIAS_TO_SLUG.set(normalizeKey(alias), entry.slug);
  }
}

/** Extrae una referencia bíblica al inicio del texto (ignora citas embebidas en prosa). */
export function parseBibleReference(text: string): ParsedBibleRef | null {
  const cleaned = text
    .replace(/^["“«]\s*/, '')
    .replace(/\s*["”»]\s*$/, '')
    .trim();

  // "… — Salmo 27:1" al final de un tema
  const dashed = cleaned.match(/[—–-]\s*((?:\d\s*)?[A-Za-záéíóúüñÁÉÍÓÚÜÑ.]+\s+\d+(?::\d+(?:\s*-\s*\d+)?)?)\s*$/);
  const candidate = dashed?.[1] ?? cleaned;

  const match = candidate.match(
    /^((?:\d\s*)?[A-Za-záéíóúüñÁÉÍÓÚÜÑ.]+(?:\s+[A-Za-záéíóúüñÁÉÍÓÚÜÑ.]+)?)\s+(\d+)(?:\s*:\s*(\d+)(?:\s*-\s*(\d+))?)?\s*$/u,
  );
  if (!match) return null;

  const bookSlug = ALIAS_TO_SLUG.get(normalizeKey(match[1]));
  if (!bookSlug) return null;

  const chapter = Number(match[2]);
  const verseStart = match[3] ? Number(match[3]) : undefined;
  const verseEnd = match[4] ? Number(match[4]) : verseStart;

  if (!Number.isFinite(chapter) || chapter < 1) return null;

  return {
    reference: candidate.trim(),
    bookSlug,
    chapter,
    verseStart,
    verseEnd,
  };
}

export function biblePassageApiUrl(ref: ParsedBibleRef): string {
  const base = `https://api.midvash.com/v1/rvr1960/${ref.bookSlug}/${ref.chapter}`;
  if (ref.verseStart == null) return base;
  if (ref.verseEnd != null && ref.verseEnd !== ref.verseStart) {
    return `${base}/${ref.verseStart}-${ref.verseEnd}`;
  }
  return `${base}/${ref.verseStart}`;
}

/** Metadatos que permiten cargar la lectura en el navegador si falla durante el build. */
export function createBiblePassage(ref: ParsedBibleRef): BiblePassageContent {
  return {
    id: `scripture-${ref.bookSlug}-${ref.chapter}-${ref.verseStart ?? 'all'}-${ref.verseEnd ?? ''}`,
    kind: 'scripture',
    title: ref.reference,
    subtitle: 'Reina-Valera 1960',
    verses: [],
    apiUrl: biblePassageApiUrl(ref),
    source: 'RV1960',
    externalUrl: bibleGatewayUrl(ref.reference),
  };
}

export async function fetchBiblePassage(ref: ParsedBibleRef): Promise<BiblePassageContent | null> {
  const emptyPassage = createBiblePassage(ref);
  const cached = (cachedReadings as Record<string, BiblePassageContent>)[emptyPassage.id];
  if (cached?.verses?.length) {
    return cached;
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(biblePassageApiUrl(ref), {
        signal: AbortSignal.timeout(6_000),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const payload = (await response.json()) as {
        data?: {
          verse?: number;
          verseEnd?: number;
          verses?: string[];
          text?: string;
        };
        meta?: { reference?: string };
      };

      const data = payload.data;
      if (!data) throw new Error('Respuesta sin datos');

      const start = data.verse ?? ref.verseStart ?? 1;
      const texts = data.verses?.length
        ? data.verses
        : data.text
          ? [data.text]
          : [];

      if (!texts.length) throw new Error('Respuesta sin versículos');

      const verses = texts.map((text, index) => ({
        number: start + index,
        text: text.trim(),
      }));

      return { ...createBiblePassage(ref), verses };
    } catch {
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
      }
    }
  }
  return null;
}
