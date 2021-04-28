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
        'woocommerce-session': `Session eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbG9lc2plLm1pY2hpZWxrb25pbmcubmwiLCJpYXQiOjE2MTk2MDY3NDIsIm5iZiI6MTYxOTYwNjc0MiwiZXhwIjoxNjE5Nzc5NTQyLCJkYXRhIjp7ImN1c3RvbWVyX2lkIjoiMTlhNDYzN2FjZmZlMTdlNjU1MDBhNzg0NDVhMTRiZjcifX0.W-6mprbMAm7R83om7URqTNLgWPiCE07i4wtWqyFaeww`,
      },
    },
    wsEndpoint: null,
    tokenName: 'apollo-token',
    persisting: false,
    websocketsOnly: false,
  }
}
