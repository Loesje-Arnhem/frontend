import { createCart } from '~/server/utils/createCart'
import { CartSchema } from '~~/server/types/CartSchema'

export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig()

  const body = await readBody(event)
  const cookies = parseCookies(event)

  try {
    const response = await $fetch(`${woocommerceApiUrl}cart/add-item`, {
      body: {
        id: body.id,
        quantity: body.quantity,
        variation: body.variation,
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
      statusMessage: error.data.message,
      data: {
        message: error.data.message,
      },
    })
  }
})
