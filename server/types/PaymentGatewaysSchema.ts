import { z } from "zod";

export const PaymentGatewaysSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.union([z.string(), z.boolean()]),
    order: z.union([z.string(), z.number()]),
    enabled: z.boolean(),
  }),
);
