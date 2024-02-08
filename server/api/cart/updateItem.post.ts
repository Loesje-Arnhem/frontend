import { createCart } from '~/server/utils/createCart'
import { CartSchema } from '~~/server/types/CartSchema'

export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig()

  const body = await readBody(event)
  const cookies = parseCookies(event)

  const response = await $fetch(`${woocommerceApiUrl}cart/update-item`, {
    params: {
      key: body.key,
      quantity: body.quantity,
    },
    method: 'POST',
    headers: {
      nonce: cookies.nonce,
      'cart-token': cookies.token,
    },
  })

  return createCart(response)
})
