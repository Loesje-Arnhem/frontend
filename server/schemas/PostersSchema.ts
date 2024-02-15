import { z } from 'zod'
import { FeaturedImageSchema } from './FeaturedImageSchema'

export const PostersSchema = z.array(
  z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
      rendered: z.string(),
    }),

    _embedded: z.object({
      'wp:featuredmedia': z.array(FeaturedImageSchema),
    }),
  }),
)

export const PostersQuerySchema = z.object({
  pageSize: z.string().default('20'),
  page: z.string().default('1'),
  include: z.string().optional(),
  exclude: z.string().optional(),
  search: z.string().optional(),
  subjectIds: z.string().optional(),
  sourceIds: z.string().optional(),
  dateBefore: z.string().optional(),
  dateAfter: z.string().optional(),
})
