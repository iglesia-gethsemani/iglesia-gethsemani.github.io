import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reflections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reflections' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    passage: z.string().optional(),
    author: z.string().optional(),
    published: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

const sermons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sermons' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    passage: z.string().optional(),
    preacher: z.string().optional(),
    youtubeUrl: z.string().url(),
    category: z
      .enum(['sermon', 'study', 'worship', 'conference', 'full-service', 'sacrament'])
      .default('sermon'),
    published: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

const doctrine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/doctrine' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    kind: z.enum(['Catecismo', 'Confesión de fe', 'Cánones']),
    tradition: z.string(),
    order: z.number(),
    published: z.boolean().default(true),
  }),
});

const serviceOrders = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/service-orders' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().default('12:00'),
    location: z.string().default('Templo Gethsemaní'),
    theme: z.string().optional(),
    sermonTitle: z.string().optional(),
    sermonPassage: z.string().optional(),
    sermonImage: z.string().optional(),
    sermonImageAlt: z.string().optional(),
    preacher: z.string().optional(),
    published: z.boolean().default(true),
    elements: z.array(
      z.object({
        label: z.string(),
        title: z.string(),
        detail: z.string().optional(),
      }),
    ),
  }),
});

const announcements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/announcements' }),
  schema: z.object({
    date: z.coerce.date(),
    published: z.boolean().default(true),
    items: z
      .array(
        z.object({
          title: z.string(),
          when: z.string().optional(),
          detail: z.string().optional(),
        }),
      )
      .default([]),
    flowers: z
      .object({
        family: z.string(),
        note: z.string().optional(),
        verse: z.string().optional(),
        reference: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { reflections, sermons, doctrine, serviceOrders, announcements };
