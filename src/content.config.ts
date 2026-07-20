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

export const collections = { reflections, sermons, doctrine };
