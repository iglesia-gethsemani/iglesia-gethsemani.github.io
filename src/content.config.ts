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
      .enum(['sermon', 'worship', 'conference', 'full-service', 'sacrament'])
      .default('sermon'),
    published: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    resourceType: z
      .enum(['article', 'book', 'video', 'audio', 'document'])
      .default('article'),
    url: z.string().url(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

export const collections = { reflections, sermons, resources };
