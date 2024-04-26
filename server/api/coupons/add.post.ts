import { CartSchema } from '~/server/types/CartSchema'
import { createCart } from '~/server/utils/createCart'

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
    return createCart(response)
  } catch (error) {
    throw createError({
      statusCode: 400,
      data: {
        message: error.data.message,
      },
    })
  }
})
