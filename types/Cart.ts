import { z } from 'zod'
import {
  BillingAdressSchema,
  CartItemScheme,
  CartSchema,
  CouponScheme,
  CouponsScheme,
  ShippingAdressSchema,
} from '~/server/types/CartSchema'

export type Cart = z.infer<typeof CartSchema>

export type CartItem = z.infer<typeof CartItemScheme>
export type Coupons = z.infer<typeof CouponsScheme>
export type Coupon = z.infer<typeof CouponScheme>
export type ShippingAddress = z.infer<typeof ShippingAdressSchema>
export type BillingAdress = z.infer<typeof BillingAdressSchema>
