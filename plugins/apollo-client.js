import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
  // IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { apiUrl } from '~/data/siteDetails'

// const PARTIAL_SCHEMA = {
//   __schema: {
//     types: [],
//   },
// }

// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData: PARTIAL_SCHEMA,
// })

// const config = {
//   fragmentMatcher,
// }
const httpLink = new HttpLink({
  uri: `${apiUrl}graphql`,
})

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink((operation, forward) => {
  if (!process.client) {
    return forward(operation)
  }
  /**
   * If session data exist in local storage, set value as session header.
   */
  const session = localStorage.getItem('woo-session')
  if (session) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        'woocommerce-session': `Session ${session}`,
      },
    }))
  }

  return forward(operation)
})

/**
 * Afterware operation
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    /**
     * Check for session header and update session in local storage accordingly.
     */
    const context = operation.getContext()
    const {
      response: { headers },
    } = context

    if (!process.client) {
      return response
    }

    const session = headers.get('woocommerce-session')
    if (session) {
      if (localStorage.getItem('woo-session') !== session) {
        localStorage.setItem('woo-session', headers.get('woocommerce-session'))
      }
    }

    return response
  })
})

export default () => {
  const cache = new InMemoryCache()

  return {
    cache,
    link: middleware.concat(afterware.concat(httpLink)),
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
