// import { HttpLink } from 'apollo-link-http'
// import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { apiUrl } from '~/data/siteDetails'

export default () => {
  const cache = new InMemoryCache()

  return {
    cache,
    httpEndpoint: `${apiUrl}graphql`,
    httpLinkOptions: {
      credentials: 'include',
      headers: {
        'woocommerce-session': `Session eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbG9lc2plLm1pY2hpZWxrb25pbmcubmwiLCJpYXQiOjE2MTk0MzA4MDAsIm5iZiI6MTYxOTQzMDgwMCwiZXhwIjoxNjE5NjAzNjAwLCJkYXRhIjp7ImN1c3RvbWVyX2lkIjoiNjkzOTk3YjMzY2M5YzVmMjZmN2U1YzllOGJjZGNiZmEifX0.pXofB3zyCJ3umPOFUkXOjiljLsAzcKIZYcAR0SpNnLs`,
      },
    },
    wsEndpoint: null,
    tokenName: 'apollo-token',
    persisting: false,
    websocketsOnly: false,
  }
}
