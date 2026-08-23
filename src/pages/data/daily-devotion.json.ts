import type { APIRoute } from 'astro';
import { dailyVerses } from '@/data/verse-of-the-day';
import { annualReadingPlan } from '@/data/reading-plan';

export const prerender = true;

/** Compact catalog for daily verse + reading. Themes load separately when sharing. */
export const GET: APIRoute = () => {
  const body = {
    verses: dailyVerses.map((verse) => ({
      reference: verse.reference,
      text: verse.text,
      version: verse.version,
    })),
    plan: annualReadingPlan.map((day) => ({
      day: day.day,
      passages: day.passages.map((passage) => passage.label),
    })),
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
