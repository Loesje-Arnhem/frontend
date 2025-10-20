import { z } from 'zod'

export const CountriesSchema = z.array(
  z.object({
    code: z.string(),
    name: z.string(),
  }),
)

export const ShippingZonesSchema = z.array(
  z.object({
    name: z.string(),
    order: z.number(),
  }),
)
