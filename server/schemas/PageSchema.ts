import { z } from "zod";
import { FeaturedImageListSchema } from "./FeaturedImageSchema";
import { RelatedProductsSectionSchema } from "./RelatedProductsSchema";
import { RelatedPostersSectionSchema } from "./RelatedPostersSchema";

export const PageSchema = z.object({
  id: z.number(),
  title: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
  }),
  excerpt: z.object({
    rendered: z.string(),
  }),
  parent: z.number().transform((val) => (val > 0 ? val : undefined)),
  _embedded: z.object({
    "wp:featuredmedia": FeaturedImageListSchema,
  }),

  acf: RelatedProductsSectionSchema.merge(RelatedPostersSectionSchema).extend({
    youtube_id: z.string().transform((val) => (val ? val : undefined)),
    // RelatedPostersSectionSchema,
  }),
});

export const PosterQuerySchema = z.object({
  slug: z.string(),
});

export const PageListSchema = z.array(PageSchema);
