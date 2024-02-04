import { CartSchema } from '~/server/types/CartSchema'

export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig()

  const body = await readBody(event)
  const cookies = parseCookies(event)

  try {
    const response = await $fetch(`${woocommerceApiUrl}cart/apply-coupon`, {
      params: {
        code: body.code,
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
