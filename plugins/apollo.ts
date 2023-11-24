import { HttpLink, ApolloLink } from '@apollo/client/core'
import { apiUrl } from '~/data/siteDetails'
import { provideApolloClient } from '@vue/apollo-composable'

const httpLink = new HttpLink({
  uri: `${apiUrl}graphql`,
})

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
const middleware = new ApolloLink((operation, forward) => {
  /**
   * If session data exist in local storage, set value as session header.
   */

  if (!process.client) {
    return forward(operation)
  }

  const session = localStorage.getItem('woo-session')
  if (session) {
    operation.setContext((context: Record<string, any>) => ({
      headers: {
        ...context.headers,
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
const afterware = new ApolloLink((operation, forward) => {
  if (!process.client) {
    return forward(operation)
  }
  return forward(operation).map((response) => {
    /**
     * Check for session header and update session in local storage accordingly.
     */
    const context = operation.getContext()
    const {
      response: { headers },
    } = context
    const session = headers.get('woocommerce-session')
    if (session) {
      if (localStorage.getItem('woo-session') !== session) {
        localStorage.setItem('woo-session', headers.get('woocommerce-session'))
      }
    }

    return response
  })
})

export default defineNuxtPlugin((nuxtApp) => {
  const { $apollo } = nuxtApp

  $apollo.defaultClient.setLink(middleware.concat(afterware.concat(httpLink)))
  provideApolloClient($apollo.defaultClient)
})
