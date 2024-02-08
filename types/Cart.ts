import { z } from 'zod'
import {
  BillingAdressSchema,
  ShippingAdressSchema,
} from '~/server/types/CartSchema'
import type { FeaturedImage } from './Content'

export type ShippingAddress = z.infer<typeof ShippingAdressSchema>
export type BillingAdress = z.infer<typeof BillingAdressSchema>

export type CartItem = {
  variation: {
    value: string
    attribute: string
  }[]
  image?: FeaturedImage
  key: string
  id: number
  quantity: number
  quantityMax: number
  title: string
  price: number
  regularPrice: number | undefined
  priceTotal: number
}

export type Coupon = {
  code: string
  price: number
}

export type Cart = {
  items: CartItem[]
  prices: {
    totalItems: number
    totalTax: number
    totalShipping: number
    totalPrice: number
  }
  paymentMethods: string[]
  coupons: Coupon[]
  itemsCount: number
}
