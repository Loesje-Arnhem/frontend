import { z } from 'zod'

export const CouponScheme = z.object({
  code: z.string(),
  discount_type: z.string(),
  totals: z.object({
    total_discount: z.string(),
    total_discount_tax: z.string(),
    currency_code: z.string(),
    currency_symbol: z.string(),
    currency_minor_unit: z.number(),
    currency_decimal_separator: z.string(),
    currency_thousand_separator: z.string(),
    currency_prefix: z.string(),
    currency_suffix: z.string(),
  }),
})

export const CouponsScheme = z.array(CouponScheme)

export const ShippingAdressSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  company: z.string(),
  address_1: z.string(),
  address_2: z.string(),
  city: z.string(),
  state: z.string(),
  postcode: z.string(),
  country: z.string(),
  phone: z.string(),
  houseNumber: z.string().optional(),
  houseNumberSuffix: z.string().optional()
})

export const BillingAdressSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  company: z.string(),
  address_1: z.string(),
  address_2: z.string(),
  city: z.string(),
  state: z.string(),
  postcode: z.string(),
  country: z.string(),
  email: z.string(),
  phone: z.string(),
  houseNumber: z.string().optional(),
  houseNumberSuffix: z.string().optional()
})

export const CartItemScheme = z.object({
  key: z.string(),
  id: z.number(),
  type: z.string(),
  quantity: z.number(),
  quantity_limits: z.object({
    minimum: z.number(),
    maximum: z.number(),
    multiple_of: z.number(),
    editable: z.boolean(),
  }),
  name: z.string(),
  short_description: z.string(),
  description: z.string(),
  sku: z.string(),
  low_stock_remaining: z.number().nullable(),
  backorders_allowed: z.boolean(),
  show_backorder_badge: z.boolean(),
  sold_individually: z.boolean(),
  permalink: z.string(),
  images: z.array(
    z.object({
      id: z.number(),
      src: z.string(),
      thumbnail: z.string(),
      srcset: z.string(),
      sizes: z.string(),
      name: z.string(),
      alt: z.string(),
    }),
  ),
  variation: z.array(z.object({ attribute: z.string(), value: z.string() })),

  prices: z.object({
    price: z.string(),
    regular_price: z.string(),
    sale_price: z.string(),
    price_range: z.null(),
    currency_code: z.string(),
    currency_symbol: z.string(),
    currency_minor_unit: z.number(),
    currency_decimal_separator: z.string(),
    currency_thousand_separator: z.string(),
    currency_prefix: z.string(),
    currency_suffix: z.string(),
    raw_prices: z.object({
      precision: z.number(),
      price: z.string(),
      regular_price: z.string(),
      sale_price: z.string(),
    }),
  }),
  totals: z.object({
    line_subtotal: z.string(),
    line_subtotal_tax: z.string(),
    line_total: z.string(),
    line_total_tax: z.string(),
    currency_code: z.string(),
    currency_symbol: z.string(),
    currency_minor_unit: z.number(),
    currency_decimal_separator: z.string(),
    currency_thousand_separator: z.string(),
    currency_prefix: z.string(),
    currency_suffix: z.string(),
  }),
  catalog_visibility: z.string(),
})

export const CartSchema = z.object({
  items: z.array(CartItemScheme),
  coupons: CouponsScheme,

  totals: z.object({
    total_items: z.string(),
    total_items_tax: z.string(),
    total_fees: z.string(),
    total_fees_tax: z.string(),
    total_discount: z.string(),
    total_discount_tax: z.string(),
    total_shipping: z.string().nullable(),
    total_shipping_tax: z.string().nullable(),
    total_price: z.string(),
    total_tax: z.string(),
    tax_lines: z.array(
      z.object({ name: z.string(), price: z.string(), rate: z.string() }),
    ),
    currency_code: z.string(),
    currency_symbol: z.string(),
    currency_minor_unit: z.number(),
    currency_decimal_separator: z.string(),
    currency_thousand_separator: z.string(),
    currency_prefix: z.string(),
    currency_suffix: z.string(),
  }),
  shipping_address: ShippingAdressSchema,
  billing_address: BillingAdressSchema,
  needs_payment: z.boolean(),
  needs_shipping: z.boolean(),
  payment_requirements: z.array(z.string()),
  has_calculated_shipping: z.boolean(),
  shipping_rates: z.array(
    z.object({
      package_id: z.number(),
      name: z.string(),
      destination: z.object({
        address_1: z.string(),
        address_2: z.string(),
        city: z.string(),
        state: z.string(),
        postcode: z.string(),
        country: z.string(),
      }),
      items: z.array(
        z.object({ key: z.string(), name: z.string(), quantity: z.number() }),
      ),
      shipping_rates: z.array(
        z.object({
          rate_id: z.string(),
          name: z.string(),
          description: z.string(),
          delivery_time: z.string(),
          price: z.string(),
          taxes: z.string(),
          instance_id: z.number(),
          method_id: z.string(),
          meta_data: z.array(z.object({ key: z.string(), value: z.string() })),
          selected: z.boolean(),
          currency_code: z.string(),
          currency_symbol: z.string(),
          currency_minor_unit: z.number(),
          currency_decimal_separator: z.string(),
          currency_thousand_separator: z.string(),
          currency_prefix: z.string(),
          currency_suffix: z.string(),
        }),
      ),
    }),
  ),
  items_count: z.number(),
  items_weight: z.number(),
  payment_methods: z.array(z.string()),
  // extensions: z.object({
  //   address: z.object({
  //     billing_street: z.string(),
  //     billing_house_number: z.string(),
  //     billing_house_number_addition: z.string(),
  //     shipping_street: z.string(),
  //     shipping_house_number: z.string(),
  //     shipping_house_number_addition: z.string(),
  //   }),
  // }),
})

export const CheckoutSchema = z.object({
  order_id: z.number(),
  status: z.string(),
  order_key: z.string(),
  customer_note: z.string(),
  customer_id: z.number(),
  shipping_address: ShippingAdressSchema,
  billing_address: BillingAdressSchema,
  payment_method: z.string(),
  payment_result: z.object({
    payment_status: z.string(),
    payment_details: z.array(z.unknown()),
    redirect_url: z.string(),
  }),
  // extensions: z.object({
  //   address: z.object({
  //     billing_address_house_number: z.string(),
  //     billing_address_house_number_suffix: z.string(),
  //     shipping_address_house_number: z.string(),
  //     shipping_address_house_number_suffix: z.string(),
  //   })
  // })
})
