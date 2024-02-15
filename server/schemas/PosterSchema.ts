import { z } from 'zod'
import { FeaturedImageSchema } from './FeaturedImageSchema'

export const PosterSchema = z.array(
  z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({ rendered: z.string() }),
    acf: z.object({
      related_products_title: z.string(),
      related_products_products: z.boolean(),
      pdf: z.string(),
      date: z.string(),
    }),
    _links: z.object({
      self: z.array(z.object({ href: z.string() })),
      collection: z.array(z.object({ href: z.string() })),
      about: z.array(z.object({ href: z.string() })),
      'wp:featuredmedia': z.array(
        z.object({ embeddable: z.boolean(), href: z.string() }),
      ),
      'wp:attachment': z.array(z.object({ href: z.string() })),
      'wp:term': z.array(
        z.object({
          taxonomy: z.string(),
          embeddable: z.boolean(),
          href: z.string(),
        }),
      ),
      curies: z.array(
        z.object({
          name: z.string(),
          href: z.string(),
          templated: z.boolean(),
        }),
      ),
    }),
    _embedded: z.object({
      'wp:featuredmedia': z.array(FeaturedImageSchema),
      'wp:term': z.array(
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
      ),
    }),
  }),
)

export const PosterQuerySchema = z.object({
  slug: z.string(),
})
