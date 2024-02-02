import { z } from 'zod'
import { CartItemScheme, CartSchema } from '~/server/types/CartSchema'

export type Cart = z.infer<typeof CartSchema>

export type CartItem = z.infer<typeof CartItemScheme>
