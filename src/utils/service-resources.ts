import {
  createBiblePassage,
  fetchBiblePassage,
  parseBibleReference,
  type BiblePassageContent,
} from './bible';
import { fetchHymn, parseHymnNumber, type HymnContent } from './hymnal';

export type ServiceResource = HymnContent | BiblePassageContent;

export interface OrderElementInput {
  label: string;
  title: string;
  detail?: string;
}

export interface EnrichedOrderElement extends OrderElementInput {
  hymnResourceId?: string;
  scriptureResourceId?: string;
}

export interface EnrichedServiceOrder {
  elements: EnrichedOrderElement[];
  sermonPassageResourceId?: string;
  resources: Record<string, ServiceResource>;
}

async function addHymn(
  resources: Record<string, ServiceResource>,
  text: string,
): Promise<string | undefined> {
  const number = parseHymnNumber(text);
  if (number == null) return undefined;

  const id = `hymn-${number}`;
  if (!resources[id]) {
    const hymn = await fetchHymn(number);
    if (!hymn) return undefined;
    resources[id] = hymn;
  }
  return id;
}

async function addScripture(
  resources: Record<string, ServiceResource>,
  text: string | undefined,
): Promise<string | undefined> {
  if (!text) return undefined;
  const parsed = parseBibleReference(text);
  if (!parsed) return undefined;

  const id = `scripture-${parsed.bookSlug}-${parsed.chapter}-${parsed.verseStart ?? 'all'}-${parsed.verseEnd ?? ''}`;
  if (!resources[id]) {
    const passage = await fetchBiblePassage(parsed);
    resources[id] = passage ?? createBiblePassage(parsed);
  }
  return id;
}

/** Resuelve letras de himnos y lecturas RV1960 usadas en un orden del culto. */
export async function enrichServiceOrder(input: {
  elements: OrderElementInput[];
  sermonPassage?: string;
  theme?: string;
}): Promise<EnrichedServiceOrder> {
  const resources: Record<string, ServiceResource> = {};

  const elements: EnrichedOrderElement[] = [];
  for (const element of input.elements) {
    const hymnResourceId = await addHymn(resources, element.title);
    const scriptureResourceId =
      (await addScripture(resources, element.detail)) ||
      (await addScripture(resources, element.title));

    elements.push({
      ...element,
      hymnResourceId,
      scriptureResourceId,
    });
  }

  const sermonPassageResourceId =
    (await addScripture(resources, input.sermonPassage)) ||
    (await addScripture(resources, input.theme));

  return { elements, sermonPassageResourceId, resources };
}
