import { z } from "zod";
import { FeaturedImageSchema } from "./FeaturedImageSchema";

export const SitemapSchema = z.array(
  z.object({
    link: z.string(),
    modified: z.string(),
    _embedded: z
      .object({
        "wp:featuredmedia": z.array(FeaturedImageSchema).optional(),
      })
      .optional(),
  }),
);

export const SitemapQuerySchema = z.object({
  type: z.enum(["pages", "posts", "product", "product_cat"]),
});
