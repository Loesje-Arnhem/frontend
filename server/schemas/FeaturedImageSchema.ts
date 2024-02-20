import { z } from 'zod'

const FeaturedImageSizeSchema = z.object({
  width: z.number(),
  height: z.number(),
  filesize: z.number().optional(),
  mime_type: z.string(),
  source_url: z.string(),
})

export const FeaturedImageSchema = z.object({
  id: z.number(),
  code: z.string().optional(),
  date: z.string(),
  slug: z.string(),
  type: z.string(),
  link: z.string(),
  title: z.object({ rendered: z.string() }),
  author: z.number(),
  caption: z.object({ rendered: z.string() }),
  alt_text: z.string(),
  media_type: z.string(),
  mime_type: z.string(),
  media_details: z.object({
    width: z.number(),
    height: z.number(),
    file: z.string(),
    filesize: z.number().optional(),
    sizes: z.object({
      thumbnail: FeaturedImageSizeSchema,
      medium: FeaturedImageSizeSchema.optional(),
      full: FeaturedImageSizeSchema.optional(),
      large: FeaturedImageSizeSchema.optional(),
      medium_large: FeaturedImageSizeSchema.optional(),
      '1536x1536': FeaturedImageSizeSchema.optional(),
      '2048x2048': FeaturedImageSizeSchema.optional(),
      woocommerce_thumbnail: FeaturedImageSizeSchema.optional(),
      woocommerce_single: FeaturedImageSizeSchema.optional(),
      woocommerce_gallery_thumbnail: FeaturedImageSizeSchema.optional(),
    }),

    original_image: z.string().optional(),
  }),
  source_url: z.string(),
  _links: z.object({
    self: z.array(z.object({ href: z.string() })),
    collection: z.array(z.object({ href: z.string() })),
    about: z.array(z.object({ href: z.string() })),
    author: z.array(z.object({ embeddable: z.boolean(), href: z.string() })),
    replies: z.array(z.object({ embeddable: z.boolean(), href: z.string() })),
  }),
})
