export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig()

  const body = await readBody(event)
  const cookies = parseCookies(event)

  const response = await $fetch(`${woocommerceApiUrl}cart/coupon`, {
    params: {
      code: body.coupon,
    },
    method: 'POST',
    headers: {
      nonce: cookies.nonce,
      'cart-token': cookies.token,
    },
  })

  return response
})
