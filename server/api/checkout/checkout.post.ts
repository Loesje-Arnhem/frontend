import { z } from 'zod'
import {
  BillingAdressSchema,
  CheckoutSchema,
  ShippingAdressSchema,
} from '~~/server/types/CartSchema'

const bodySchema = z.object({
  billing_address: BillingAdressSchema,
  shipping_address: ShippingAdressSchema,
  payment_method: z.string(),
})

export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig()

  const formData = await readValidatedBody(event, (body) =>
    bodySchema.safeParse(body),
  )

  if (!formData.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Something went wrong',
    })
  }

  const cookies = parseCookies(event)

  const { shipping_address, billing_address, payment_method } = formData.data

  try {
    const response = await $fetch(`${woocommerceApiUrl}checkout`, {
      body: {
        payment_method,
        billing_address: {
          first_name: billing_address.first_name,
          last_name: billing_address.last_name,
          company: billing_address.company,
          address_1: billing_address.address_1,
          address_2: billing_address.address_2,
          city: billing_address.city,
          state: billing_address.state,
          postcode: billing_address.postcode,
          country: billing_address.country,
          email: billing_address.email,
          phone: '0123123',
        },
        shipping_address: {
          first_name: shipping_address.first_name,
          last_name: shipping_address.last_name,
          company: shipping_address.company,
          address_1: shipping_address.address_1,
          address_2: shipping_address.address_2,
          city: shipping_address.city,
          state: shipping_address.state,
          postcode: shipping_address.postcode,
          country: shipping_address.country,
          phone: shipping_address.phone,
        },
      },
      method: 'POST',

      headers: {
        nonce: cookies.nonce,
        'cart-token': cookies.token,
      },
    })

    const parsed = CheckoutSchema.safeParse(response)

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong',
      })
    }

    return parsed.data
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.data.message,
    })
  }
})
