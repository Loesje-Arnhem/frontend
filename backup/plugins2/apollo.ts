import { Context } from '@nuxt/types'
import {
  provide,
  onGlobalSetup,
  defineNuxtPlugin,
} from '@nuxtjs/composition-api'
import {
  DefaultApolloClient,
  provideApolloClient,
} from '@vue/apollo-composable'

/**
 * This plugin will connect @nuxt/apollojs with @vue/apollo-composable
 */

export default defineNuxtPlugin(({ app }: Context): void => {
  onGlobalSetup(() => {
    provide(DefaultApolloClient, app.apolloProvider?.defaultClient)
    provideApolloClient(app.apolloProvider?.defaultClient)
  })
})
