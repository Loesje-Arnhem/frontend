import { createCart } from '~/server/utils/createCart'

export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig()

  const cookies = parseCookies(event)
  const response = await $fetch.raw(`${woocommerceApiUrl}cart`, {
    headers: {
      'nonce': cookies.nonce,
      'cart-token': cookies.token,
    },
  })
  const nonce = response.headers.get('nonce')
  const cartToken = response.headers.get('cart-token')

  const cart = createCart(response._data)

  event.node.res.setHeader('nonce', nonce ?? '')
  event.node.res.setHeader('token', cartToken ?? '')

  return cart
})
