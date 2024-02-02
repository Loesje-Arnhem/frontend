import { CartSchema } from '~~/server/types/CartSchema'

export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig()

  const body = await readBody(event)
  const nonce = event.headers.get('nonce')
  const token = event.headers.get('token')

  if (!token || !nonce) {
    return
  }

  const response = await $fetch(`${woocommerceApiUrl}cart/add-item`, {
    params: {
      id: body.id,
      quantity: body.quantity,
    },
    method: 'POST',
    headers: {
      nonce,
      'cart-token': token,
    },
  })

  return response
})
