import { z } from "zod";

const RelatedPostersSchema = z.union([
  z.literal(false),
  z
    .array(
      z.object({
        poster: z
          .union([
            z.literal(false),
            z.object({
              ID: z.number(),
            }),
          ])
          .transform((val) => {
            if (!val) {
              return undefined;
            }
            return val;
          }),
      }),
    )
    .transform((val) => {
      if (!val) {
        return [];
      }

      return val;
    }),
]);

const RelatedPostersSubjectsSchema = z.union([
  z.literal(false),
  z.array(z.number()).transform((val) => {
    if (!val) {
      return [];
    }
    return val;
  }),
]);

export const RelatedPostersSectionSchema = z.object({
  related_posters_title: z.string().transform((val) => (val ? val : undefined)),
  related_posters_search: z
    .string()
    .transform((val) => (val ? val : undefined)),
  related_posters_subjects: RelatedPostersSubjectsSchema,
  related_posters_posters: RelatedPostersSchema,
});
