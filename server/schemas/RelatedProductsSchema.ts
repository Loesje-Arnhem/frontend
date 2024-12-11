import { z } from "zod";

export const RelatedProductsSchema = z.union([
  z.literal(false),
  z
    .array(
      z.object({
        product: z
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

export const RelatedProductsSectionSchema = z.object({
  related_products_title: z.string(),
  related_products_products: RelatedProductsSchema,
});
