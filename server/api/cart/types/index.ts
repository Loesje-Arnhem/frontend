import { z } from 'zod'

export const cartSchema = z.object({
  items: z.array(
    z.object({
      key: z.string(),
      id: z.number(),
      type: z.string(),
      quantity: z.number(),
      quantity_limits: z.object({
        minimum: z.number(),
        maximum: z.number(),
        multiple_of: z.number(),
        editable: z.boolean()
      }),
      name: z.string(),
      short_description: z.string(),
      description: z.string(),
      sku: z.string(),
      low_stock_remaining: z.null(),
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
          alt: z.string()
        })
      ),
      variation: z.array(z.unknown()),
      item_data: z.array(z.unknown()),
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
          sale_price: z.string()
        })
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
        currency_suffix: z.string()
      }),
      catalog_visibility: z.string(),
      extensions: z.object({
        subscriptions: z.object({
          billing_period: z.null(),
          billing_interval: z.null(),
          subscription_length: z.null(),
          trial_length: z.null(),
          trial_period: z.null(),
          sign_up_fees: z.null(),
          sign_up_fees_tax: z.null(),
          is_resubscribe: z.null(),
          switch_type: z.null(),
          synchronization: z.null()
        })
      })
    })
  ),
  coupons: z.array(z.unknown()),
  fees: z.array(z.unknown()),
  totals: z.object({
    total_items: z.string(),
    total_items_tax: z.string(),
    total_fees: z.string(),
    total_fees_tax: z.string(),
    total_discount: z.string(),
    total_discount_tax: z.string(),
    total_shipping: z.string(),
    total_shipping_tax: z.string(),
    total_price: z.string(),
    total_tax: z.string(),
    tax_lines: z.array(
      z.object({ name: z.string(), price: z.string(), rate: z.string() })
    ),
    currency_code: z.string(),
    currency_symbol: z.string(),
    currency_minor_unit: z.number(),
    currency_decimal_separator: z.string(),
    currency_thousand_separator: z.string(),
    currency_prefix: z.string(),
    currency_suffix: z.string()
  }),
  shipping_address: z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    address_1: z.string(),
    address_2: z.string(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
    phone: z.string()
  }),
  billing_address: z.object({
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
    phone: z.string()
  }),
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
        country: z.string()
      }),
      items: z.array(
        z.object({ key: z.string(), name: z.string(), quantity: z.number() })
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
          currency_suffix: z.string()
        })
      )
    })
  ),
  items_count: z.number(),
  items_weight: z.number(),
  cross_sells: z.array(z.unknown()),
  errors: z.array(z.unknown()),
  payment_methods: z.array(z.string()),
  extensions: z.object({ subscriptions: z.array(z.unknown()) })
})
