import { z } from 'zod'

export const CountriesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    order: z.number(),
    _links: z.object({
      self: z.array(z.object({ href: z.string() })),
      collection: z.array(z.object({ href: z.string() })),
      describedby: z.array(z.object({ href: z.string() })),
    }),
  }),
)
