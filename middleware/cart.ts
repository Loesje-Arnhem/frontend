export default defineNuxtRouteMiddleware(async () => {
  if (process.server) {
    return
  }

  const nonce = useCookie('nonce')
  const token = useCookie('token')

  const response = await $fetch.raw('/api/cart/cart', {
    headers: {
      nonce: nonce.value ?? '',
      token: token.value ?? '',
    },
  })
  nonce.value = response.headers.get('nonce')
  token.value = response.headers.get('token')

  const cart = useCartState()
  cart.value = response._data
})
