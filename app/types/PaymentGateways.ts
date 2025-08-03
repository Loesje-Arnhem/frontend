import type { z } from "zod";
import type { PaymentGatewaysSchema } from "~~/server/types/PaymentGatewaysSchema";

export type PaymentGatewaysType = z.infer<typeof PaymentGatewaysSchema>;
