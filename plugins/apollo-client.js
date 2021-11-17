import { InMemoryCache } from '@apollo/client/core'
import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
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
  }
}
