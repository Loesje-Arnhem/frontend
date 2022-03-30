import LOGIN_MUTATION from '~/graphql/Customer/Login.gql'
import USER_QUERY from '~/graphql/User/User.gql'

import { LocalScheme } from '~auth/runtime'

export default class GraphQLScheme extends LocalScheme {
  async login(credentials, { reset = true } = {}) {
    const {
      apolloProvider: { defaultClient: apolloClient },
      $apolloHelpers,
    } = this.$auth.ctx.app

    // Ditch any leftover local tokens before attempting to log in
    if (reset) {
      this.$auth.reset({ resetInterceptor: false })
    }

    // Make login request
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: credentials,
    })

    this.token.set(data.login.authToken)

    // Set your graphql-token
    await $apolloHelpers.onLogin(data.login.authToken)

    // Fetch user
    await this.fetchUser()
    // Update tokens
    return data.login.authToken
  }

  fetchUser() {
    const {
      apolloProvider: { defaultClient: apolloClient },
    } = this.$auth.ctx.app

    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // Try to fetch user
    return apolloClient
      .query({
        query: USER_QUERY,
      })
      .then(({ data }) => {
        if (!data.customer) {
          const error = new Error(`User Data response not resolved`)
          return Promise.reject(error)
        }

        this.$auth.setUser(data.customer)

        return data.customer
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
        return Promise.reject(error)
      })
  }

  async logout() {
    const { $apolloHelpers } = this.$auth.ctx.app

    await $apolloHelpers.onLogout()
    return this.$auth.reset({ resetInterceptor: false })
  }

  initializeRequestInterceptor() {
    // Instead of initializing axios interceptors, Do nothing
    // Since we are not using axios
  }

  reset() {
    this.$auth.setUser(false)
    this.token.reset()
  }
}
