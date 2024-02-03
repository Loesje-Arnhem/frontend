export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig()

  const body = await readBody(event)
  const nonce = event.headers.get('nonce')
  const token = event.headers.get('token')

  if (!token || !nonce) {
    return
  }

  const response = await $fetch(`${woocommerceApiUrl}cart/coupon`, {
    params: {
      code: body.coupon,
    },
    method: 'POST',
    headers: {
      nonce,
      'cart-token': token,
    },
  })

  return response
})
