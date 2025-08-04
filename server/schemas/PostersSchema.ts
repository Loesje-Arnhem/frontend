import { z } from "zod";
import { FeaturedImageSchema } from "./FeaturedImageSchema";

export const DailyPostersSchema = z.array(
  z.object({
    id: z.number(),
    title: z.object({
      rendered: z.string(),
    }),

    "wp:featuredmedia": z.array(FeaturedImageSchema).optional(),
  }),
);

export const PosterSearchSchema = z.array(
  z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
      rendered: z.string(),
    }),
  }),
);

export const PostersSchema = z.array(
  z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
      rendered: z.string(),
    }),
    "wp:featuredmedia": z.array(FeaturedImageSchema).optional(),
  }),
);

export const PostersQuerySchema = z.object({
  pageSize: z.string().default("20"),
  page: z.string().default("1"),
  include: z.string().optional(),
  exclude: z.string().optional(),
  search: z.string().optional(),
  subjectIds: z.string().optional(),
  sourceIds: z.string().optional(),
  dateBefore: z.string().optional(),
  dateAfter: z.string().optional(),
});
