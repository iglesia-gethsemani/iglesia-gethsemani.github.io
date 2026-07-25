export interface HymnStanza {
  name: string;
  lines: string[];
}

export interface HymnContent {
  id: string;
  kind: 'hymn';
  number: number;
  title: string;
  subtitle?: string;
  intro?: string;
  authors?: string[];
  stanzas: HymnStanza[];
  source: string;
  externalUrl: string;
}

interface RawHymn {
  numero?: number;
  titulo?: string;
  intro?: string;
  autores?: string[];
  versos?: Array<{ nombre?: string; lineas?: string[] }>;
}

const HYMNAL_URL = 'https://himnariop.web.app/himnos.json';
const HYMNAL_HOME = 'https://himnariop.web.app/#';

let hymnalPromise: Promise<Map<number, RawHymn>> | null = null;

async function loadHymnalIndex(): Promise<Map<number, RawHymn>> {
  if (!hymnalPromise) {
    hymnalPromise = (async () => {
      const index = new Map<number, RawHymn>();
      try {
        const response = await fetch(HYMNAL_URL);
        if (!response.ok) return index;
        const data = (await response.json()) as Array<RawHymn | null>;
        for (const hymn of data) {
          if (hymn?.numero != null) index.set(hymn.numero, hymn);
        }
      } catch {
        // Build continues; taps fall back to external hymnal link when missing.
      }
      return index;
    })();
  }
  return hymnalPromise;
}

/** Detecta "Himno No. 286", "Himno de confirmación No. 337", "Doxología No. 450". */
export function parseHymnNumber(text: string): number | null {
  const match = text.match(
    /(?:Himno(?:\s+de\s+[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+)?|Doxolog[ií]a)\s+No\.\s*(\d+)/i,
  );
  if (!match) return null;
  const number = Number(match[1]);
  return Number.isFinite(number) && number > 0 ? number : null;
}

export async function fetchHymn(number: number): Promise<HymnContent | null> {
  const index = await loadHymnalIndex();
  const hymn = index.get(number);
  if (!hymn?.titulo || !hymn.versos?.length) return null;

  const stanzas = hymn.versos
    .filter((verso) => verso.lineas?.some((line) => line.trim()))
    .map((verso, i) => ({
      name: (verso.nombre || String(i + 1)).trim(),
      lines: (verso.lineas || []).map((line) => line.trim()).filter(Boolean),
    }));

  if (!stanzas.length) return null;

  return {
    id: `hymn-${number}`,
    kind: 'hymn',
    number,
    title: `Himno ${number}`,
    subtitle: hymn.titulo,
    intro: hymn.intro?.trim() || undefined,
    authors: hymn.autores?.map((a) => a.trim()).filter(Boolean),
    stanzas,
    source: 'Himnario Evangélico Presbiteriano',
    externalUrl: HYMNAL_HOME,
  };
}
