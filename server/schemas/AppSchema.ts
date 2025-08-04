import { z } from "zod";
import { FeaturedImageSchema } from "./FeaturedImageSchema";
import { TermsSchema } from "./TermsSchema";

export const AppPostersSchema = z.array(
  z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
      rendered: z.string(),
    }),

    "wp:featuredmedia": z.array(FeaturedImageSchema),
    _embedded: z.object({
      "wp:term": TermsSchema,
    }),
  }),
);

export const AppPostersQuerySchema = z.object({
  pageSize: z.string().default("20"),
  page: z.string().default("1"),
  include: z.string().optional(),
  exclude: z.string().optional(),
  search: z.string().optional(),
  subjectIds: z.string().optional(),
});
