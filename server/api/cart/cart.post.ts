
export default defineEventHandler(async (event) => {

  const { woocommerceApiUrl } = useAppConfig()

  const body = await readBody(event)
  let nonce = event.headers.get('nonce')

  console.log(nonce)

  const responseNonce = await $fetch.raw(`${woocommerceApiUrl}cart`, {
    method: 'GET',
    headers: {
      nonce: nonce ?? ''
    }
  })
  nonce = responseNonce.headers.get('nonce')
  event.node.res.setHeader('nonce', nonce ?? '')

  const response = await $fetch.raw(`${woocommerceApiUrl}cart/add-item`, {
    params: {
      id: body.id,
      quantity: 1
    },
    method: 'POST',
    headers: {
      nonce: nonce ?? '',
      'cart-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidF8xNmRlNzE2MDkxMGRmNjJkODlkZDJjOWFlMzkyOTgiLCJleHAiOjE3MDY5OTkyMDYsImlzcyI6IndjXC9zdG9yZVwvdjEiLCJpYXQiOjE3MDY4MjY0MDZ9.c_-0ZLeg9aQVTbn7xTWSP7-L0FY_Sb2PqO9DygjAif0'
    }
  })

  nonce = response.headers.get('nonce')
  event.node.res.setHeader('nonce', nonce ?? '')


  return {
    data: response._data,
    body,
    nonce: response.headers.get('nonce')
  }
})
