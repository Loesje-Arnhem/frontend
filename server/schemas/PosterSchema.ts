import { z } from "zod";
import { FeaturedImageSchema } from "./FeaturedImageSchema";
import { TermsSchema } from "./TermsSchema";
import { RelatedProductsSectionSchema } from "./RelatedProductsSchema";

export const PosterSchema = z.array(
  z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({ rendered: z.string() }),
    acf: RelatedProductsSectionSchema.extend({
      pdf: z.union([z.literal(false), z.string()]).transform((val) => {
        if (!val) {
          return undefined;
        }
        return val;
      }),
      date: z.string(),
    }),
    _links: z.object({
      self: z.array(z.object({ href: z.string() })),
      collection: z.array(z.object({ href: z.string() })),
      about: z.array(z.object({ href: z.string() })),
      "wp:featuredmedia": z.array(
        z.object({ embeddable: z.boolean(), href: z.string() }),
      ),
      "wp:attachment": z.array(z.object({ href: z.string() })),
      "wp:term": z.array(
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
      "wp:featuredmedia": z.array(FeaturedImageSchema),
      "wp:term": TermsSchema,
    }),
  }),
);

export const PosterQuerySchema = z.object({
  slug: z.string(),
});
