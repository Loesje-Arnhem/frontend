import { LoginMutation, UserQuery } from '~/graphql/auth'
import { provideApolloClient, useApolloClient } from '@vue/apollo-composable'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

// export default defineEventHandler(async (event) => {
//   const nuxtApp = useNuxtApp()
//   const { username, password } = await readBody(event)

//   const { data } = await nuxtApp.$apollo.defaultClient.mutate({
//     mutation: LoginMutation,
//     variables: {
//       username,
//       password,
//     },
//   })

//   return {
//     token: {
//       accessToken: data.login.authToken,
//       refreshToken: data.login.refreshToken,
//     },
//   }
// })
export default defineEventHandler(async (event) => {
  const authHeaderValue = getRequestHeader(event, 'authorization')

  if (typeof authHeaderValue === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage:
        'Need to pass valid Bearer-authorization header to access this endpoint',
    })
  }
  // event handler
  const httpLink = createHttpLink({
    uri: 'https://shop.loesje.nl/graphql',
  })
  const cache = new InMemoryCache()

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists

    // return the headers to the context so httpLink can read them

    return {
      headers: {
        ...headers,
        authorization: authHeaderValue,
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  })

  provideApolloClient(apolloClient)
  const { resolveClient } = useApolloClient()
  const client = resolveClient()

  try {
    const {
      data: { customer },
    } = await client.query({
      query: UserQuery,
    })
    return {
      user: customer,
    }
  } catch (error) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You must be logged in to use this endpoint',
    })
  }
})
