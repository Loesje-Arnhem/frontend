import { CartSchema } from '~~/server/types/CartSchema'

export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig()

  const body = await readBody(event)
  const nonce = event.headers.get('nonce')
  const token = event.headers.get('token')

  if (!token || !nonce) {
    return
  }

  const response = await $fetch(`${woocommerceApiUrl}cart/update-item`, {
    params: {
      key: body.key,
      quantity: body.quantity,
    },
    method: 'POST',
    headers: {
      nonce,
      'cart-token': token,
    },
  })

  const parsed = CartSchema.safeParse(response)

  if (!parsed.success) {
    throw parsed.error.issues
  }

  return parsed.data
})
