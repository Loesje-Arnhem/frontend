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
        'woocommerce-session': `Session eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbG9lc2plLm1pY2hpZWxrb25pbmcubmwiLCJpYXQiOjE2MTk2Mzc3NzcsIm5iZiI6MTYxOTYzNzc3NywiZXhwIjoxNjE5ODEwNTc3LCJkYXRhIjp7ImN1c3RvbWVyX2lkIjoiMSJ9fQ.dyfF-EqAE7B6kT7gXeR_ZghkqI6r-MDx6opXQCI2UDE`,
      },
    },
    wsEndpoint: null,
    tokenName: 'apollo-token',
    persisting: false,
    websocketsOnly: false,
  }
}
