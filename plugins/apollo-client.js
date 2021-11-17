import { InMemoryCache, HttpLink } from '@apollo/client/core'
import { apiUrl } from '~/data/siteDetails'

const httpLink = new HttpLink({
  uri: `${apiUrl}graphql`,
})

const cache = new InMemoryCache()

export default () => {
  return {
    cache,
    link: httpLink,
    defaultHttpLink: false,
    httpLinkOptions: {
      credentials: 'include',
    },
    wsEndpoint: null,
    tokenName: 'apollo-token',
    persisting: false,
    websocketsOnly: false,
    apollo: {
      defaultOptions: {
        query: {
          fetchPolicy: 'cache-and-network',
        },
      },
    },
  }
}
