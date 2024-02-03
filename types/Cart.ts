import { z } from 'zod'
import {
  CartItemScheme,
  CartSchema,
  CouponScheme,
  CouponsScheme,
} from '~/server/types/CartSchema'

export type Cart = z.infer<typeof CartSchema>

export type CartItem = z.infer<typeof CartItemScheme>
export type Coupons = z.infer<typeof CouponsScheme>
export type Coupon = z.infer<typeof CouponScheme>
