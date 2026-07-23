import { bibleGatewayUrl } from '../utils/calendar';

export interface ReadingPassage {
  /** Referencia en español para mostrar (ej. «Génesis 1–2»). */
  label: string;
  /** Referencia para Bible Gateway en inglés (ej. «Genesis 1-2»). */
  gatewayRef: string;
}

export interface DayReading {
  day: number;
  passages: ReadingPassage[];
}

interface BookSpec {
  nameEs: string;
  nameEn: string;
  chapters: number;
}

/** Libros del AT (orden canónico protestante), sin Salmos (van aparte). */
const OLD_TESTAMENT: BookSpec[] = [
  { nameEs: 'Génesis', nameEn: 'Genesis', chapters: 50 },
  { nameEs: 'Éxodo', nameEn: 'Exodus', chapters: 40 },
  { nameEs: 'Levítico', nameEn: 'Leviticus', chapters: 27 },
  { nameEs: 'Números', nameEn: 'Numbers', chapters: 36 },
  { nameEs: 'Deuteronomio', nameEn: 'Deuteronomy', chapters: 34 },
  { nameEs: 'Josué', nameEn: 'Joshua', chapters: 24 },
  { nameEs: 'Jueces', nameEn: 'Judges', chapters: 21 },
  { nameEs: 'Rut', nameEn: 'Ruth', chapters: 4 },
  { nameEs: '1 Samuel', nameEn: '1 Samuel', chapters: 31 },
  { nameEs: '2 Samuel', nameEn: '2 Samuel', chapters: 24 },
  { nameEs: '1 Reyes', nameEn: '1 Kings', chapters: 22 },
  { nameEs: '2 Reyes', nameEn: '2 Kings', chapters: 25 },
  { nameEs: '1 Crónicas', nameEn: '1 Chronicles', chapters: 29 },
  { nameEs: '2 Crónicas', nameEn: '2 Chronicles', chapters: 36 },
  { nameEs: 'Esdras', nameEn: 'Ezra', chapters: 10 },
  { nameEs: 'Nehemías', nameEn: 'Nehemiah', chapters: 13 },
  { nameEs: 'Ester', nameEn: 'Esther', chapters: 10 },
  { nameEs: 'Job', nameEn: 'Job', chapters: 42 },
  { nameEs: 'Proverbios', nameEn: 'Proverbs', chapters: 31 },
  { nameEs: 'Eclesiastés', nameEn: 'Ecclesiastes', chapters: 12 },
  { nameEs: 'Cantares', nameEn: 'Song of Solomon', chapters: 8 },
  { nameEs: 'Isaías', nameEn: 'Isaiah', chapters: 66 },
  { nameEs: 'Jeremías', nameEn: 'Jeremiah', chapters: 52 },
  { nameEs: 'Lamentaciones', nameEn: 'Lamentations', chapters: 5 },
  { nameEs: 'Ezequiel', nameEn: 'Ezekiel', chapters: 48 },
  { nameEs: 'Daniel', nameEn: 'Daniel', chapters: 12 },
  { nameEs: 'Oseas', nameEn: 'Hosea', chapters: 14 },
  { nameEs: 'Joel', nameEn: 'Joel', chapters: 3 },
  { nameEs: 'Amós', nameEn: 'Amos', chapters: 9 },
  { nameEs: 'Abdías', nameEn: 'Obadiah', chapters: 1 },
  { nameEs: 'Jonás', nameEn: 'Jonah', chapters: 4 },
  { nameEs: 'Miqueas', nameEn: 'Micah', chapters: 7 },
  { nameEs: 'Nahúm', nameEn: 'Nahum', chapters: 3 },
  { nameEs: 'Habacuc', nameEn: 'Habakkuk', chapters: 3 },
  { nameEs: 'Sofonías', nameEn: 'Zephaniah', chapters: 3 },
  { nameEs: 'Hageo', nameEn: 'Haggai', chapters: 2 },
  { nameEs: 'Zacarías', nameEn: 'Zechariah', chapters: 14 },
  { nameEs: 'Malaquías', nameEn: 'Malachi', chapters: 4 },
];

const NEW_TESTAMENT: BookSpec[] = [
  { nameEs: 'Mateo', nameEn: 'Matthew', chapters: 28 },
  { nameEs: 'Marcos', nameEn: 'Mark', chapters: 16 },
  { nameEs: 'Lucas', nameEn: 'Luke', chapters: 24 },
  { nameEs: 'Juan', nameEn: 'John', chapters: 21 },
  { nameEs: 'Hechos', nameEn: 'Acts', chapters: 28 },
  { nameEs: 'Romanos', nameEn: 'Romans', chapters: 16 },
  { nameEs: '1 Corintios', nameEn: '1 Corinthians', chapters: 16 },
  { nameEs: '2 Corintios', nameEn: '2 Corinthians', chapters: 13 },
  { nameEs: 'Gálatas', nameEn: 'Galatians', chapters: 6 },
  { nameEs: 'Efesios', nameEn: 'Ephesians', chapters: 6 },
  { nameEs: 'Filipenses', nameEn: 'Philippians', chapters: 4 },
  { nameEs: 'Colosenses', nameEn: 'Colossians', chapters: 4 },
  { nameEs: '1 Tesalonicenses', nameEn: '1 Thessalonians', chapters: 5 },
  { nameEs: '2 Tesalonicenses', nameEn: '2 Thessalonians', chapters: 3 },
  { nameEs: '1 Timoteo', nameEn: '1 Timothy', chapters: 6 },
  { nameEs: '2 Timoteo', nameEn: '2 Timothy', chapters: 4 },
  { nameEs: 'Tito', nameEn: 'Titus', chapters: 3 },
  { nameEs: 'Filemón', nameEn: 'Philemon', chapters: 1 },
  { nameEs: 'Hebreos', nameEn: 'Hebrews', chapters: 13 },
  { nameEs: 'Santiago', nameEn: 'James', chapters: 5 },
  { nameEs: '1 Pedro', nameEn: '1 Peter', chapters: 5 },
  { nameEs: '2 Pedro', nameEn: '2 Peter', chapters: 3 },
  { nameEs: '1 Juan', nameEn: '1 John', chapters: 5 },
  { nameEs: '2 Juan', nameEn: '2 John', chapters: 1 },
  { nameEs: '3 Juan', nameEn: '3 John', chapters: 1 },
  { nameEs: 'Judas', nameEn: 'Jude', chapters: 1 },
  { nameEs: 'Apocalipsis', nameEn: 'Revelation', chapters: 22 },
];

const PSALMS_CHAPTERS = 150;
const DAYS_IN_PLAN = 365;

type ChapterRef = { book: BookSpec; chapter: number };

function flattenBooks(books: BookSpec[]): ChapterRef[] {
  const refs: ChapterRef[] = [];
  for (const book of books) {
    for (let c = 1; c <= book.chapters; c++) {
      refs.push({ book, chapter: c });
    }
  }
  return refs;
}

function formatRange(book: BookSpec, start: number, end: number): ReadingPassage {
  const label =
    start === end ? `${book.nameEs} ${start}` : `${book.nameEs} ${start}–${end}`;
  const gatewayRef =
    start === end ? `${book.nameEn} ${start}` : `${book.nameEn} ${start}-${end}`;
  return { label, gatewayRef };
}

/** Agrupa capítulos consecutivos del mismo libro en un solo pasaje. */
function groupChapters(refs: ChapterRef[]): ReadingPassage[] {
  if (refs.length === 0) return [];
  const passages: ReadingPassage[] = [];
  let start = refs[0];
  let prev = refs[0];

  for (let i = 1; i < refs.length; i++) {
    const cur = refs[i];
    if (cur.book.nameEn === prev.book.nameEn && cur.chapter === prev.chapter + 1) {
      prev = cur;
      continue;
    }
    passages.push(formatRange(start.book, start.chapter, prev.chapter));
    start = cur;
    prev = cur;
  }
  passages.push(formatRange(start.book, start.chapter, prev.chapter));
  return passages;
}

/**
 * Plan anual propio: cada día AT + NT + un salmo.
 * Los capítulos de AT y NT se reparten de forma uniforme a lo largo del año.
 */
function buildAnnualPlan(): DayReading[] {
  const otChapters = flattenBooks(OLD_TESTAMENT);
  const ntChapters = flattenBooks(NEW_TESTAMENT);
  const plan: DayReading[] = [];

  for (let day = 1; day <= DAYS_IN_PLAN; day++) {
    const otStart = Math.floor(((day - 1) * otChapters.length) / DAYS_IN_PLAN);
    const otEnd = Math.floor((day * otChapters.length) / DAYS_IN_PLAN);
    const ntStart = Math.floor(((day - 1) * ntChapters.length) / DAYS_IN_PLAN);
    const ntEnd = Math.floor((day * ntChapters.length) / DAYS_IN_PLAN);

    const otSlice = otChapters.slice(otStart, Math.max(otEnd, otStart + 1));
    const ntSlice = ntChapters.slice(ntStart, Math.max(ntEnd, ntStart + 1));
    const psalmChapter = ((day - 1) % PSALMS_CHAPTERS) + 1;

    const passages: ReadingPassage[] = [
      ...groupChapters(otSlice),
      ...groupChapters(ntSlice),
      {
        label: `Salmo ${psalmChapter}`,
        gatewayRef: `Psalm ${psalmChapter}`,
      },
    ];

    plan.push({ day, passages });
  }

  return plan;
}

export const annualReadingPlan: DayReading[] = buildAnnualPlan();

export function getReadingForDay(dayOfYear: number): DayReading {
  const day = Math.min(Math.max(dayOfYear, 1), DAYS_IN_PLAN);
  return annualReadingPlan[day - 1];
}

export function passageUrl(passage: ReadingPassage): string {
  return bibleGatewayUrl(passage.gatewayRef);
}

export function formatPassagesLabel(passages: ReadingPassage[]): string {
  return passages.map((p) => p.label).join(' · ');
}
