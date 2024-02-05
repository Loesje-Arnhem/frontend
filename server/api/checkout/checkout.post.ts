import { z } from 'zod'
import {
  BillingAdressSchema,
  CartSchema,
  ShippingAdressSchema,
} from '~~/server/types/CartSchema'

const bodySchema = z.object({
  billing_address: BillingAdressSchema,
  shipping_address: ShippingAdressSchema,
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

  try {
    const response = await $fetch(`${woocommerceApiUrl}cart/update-customer`, {
      params: {
        billing_address: {
          first_name: 'test',
        },
      },
      method: 'POST',
      headers: {
        nonce: cookies.nonce,
        'cart-token': cookies.token,
      },
    })

    const parsed = CartSchema.safeParse(response)

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
