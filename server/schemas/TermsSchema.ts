import { z } from 'zod'

export const TermsSchema = z.array(
  z.array(
    z.object({
      id: z.number(),
      link: z.string(),
      name: z.string(),
      slug: z.string(),
      taxonomy: z.string(),
      acf: z.array(z.unknown()),
      _links: z.object({
        self: z.array(z.object({ href: z.string() })),
        collection: z.array(z.object({ href: z.string() })),
        about: z.array(z.object({ href: z.string() })),
        'wp:post_type': z.array(z.object({ href: z.string() })),
        curies: z.array(
          z.object({
            name: z.string(),
            href: z.string(),
            templated: z.boolean(),
          }),
        ),
      }),
    }),
  ),
)
