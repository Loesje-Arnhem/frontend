import { LoginMutation } from '~/graphql/auth'
import { provideApolloClient, useApolloClient } from '@vue/apollo-composable'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
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
  const { username, password } = await readBody(event)
  // event handler
  const httpLink = createHttpLink({
    uri: 'https://shop.loesje.nl/graphql',
  })
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  })

  provideApolloClient(apolloClient)
  const { resolveClient } = useApolloClient()
  const client = resolveClient()

  const {
    data: { login },
  } = await client.mutate({
    mutation: LoginMutation,
    variables: {
      username,
      password,
    },
  })
  return {
    token: {
      accessToken: login.authToken,
      refreshToken: login.refreshToken,
    },
  }
})
