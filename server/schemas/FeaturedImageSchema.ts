import { z } from "zod";

const FeaturedImageSizeSchema = z.object({
  width: z.number(),
  height: z.number(),
  filesize: z.number().optional(),
  mime_type: z.string(),
  source_url: z.string(),
});

export const FeaturedImageSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  date: z.string().optional(),
  slug: z.string().optional(),
  type: z.string().optional(),
  link: z.string().optional(),
  title: z.object({ rendered: z.string() }).optional(),
  author: z.number().optional(),
  caption: z.object({ rendered: z.string() }).optional(),
  alt_text: z.string().optional(),
  media_type: z.string().optional(),
  mime_type: z.string().optional(),
  media_details: z
    .object({
      width: z.number().optional(),
      height: z.number().optional(),
      file: z.string().optional(),
      filesize: z.number().optional(),
      sizes: z
        .object({
          thumbnail: FeaturedImageSizeSchema.optional(),
          medium: FeaturedImageSizeSchema.optional(),
          full: FeaturedImageSizeSchema.optional(),
          large: FeaturedImageSizeSchema.optional(),
          medium_large: FeaturedImageSizeSchema.optional(),
          "1536x1536": FeaturedImageSizeSchema.optional(),
          "2048x2048": FeaturedImageSizeSchema.optional(),
          woocommerce_thumbnail: FeaturedImageSizeSchema.optional(),
          woocommerce_single: FeaturedImageSizeSchema.optional(),
          woocommerce_gallery_thumbnail: FeaturedImageSizeSchema.optional(),
        })
        .optional(),

      original_image: z.string().optional(),
    })
    .optional(),
  source_url: z.string().optional(),
  _links: z
    .object({
      self: z.array(z.object({ href: z.string() })),
      collection: z.array(z.object({ href: z.string() })),
      about: z.array(z.object({ href: z.string() })),
      author: z.array(z.object({ embeddable: z.boolean(), href: z.string() })),
      replies: z.array(z.object({ embeddable: z.boolean(), href: z.string() })),
    })
    .optional(),
});
