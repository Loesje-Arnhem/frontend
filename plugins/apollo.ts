import {
  provide,
  onGlobalSetup,
  defineNuxtPlugin,
} from '@nuxtjs/composition-api'
import {
  DefaultApolloClient,
  provideApolloClient,
} from '@vue/apollo-composable'
import { Context } from '@nuxt/types'

/**
 * This plugin will connect @nuxt/apollojs with @vue/apollo-composable
 */
export default defineNuxtPlugin(({ app }: Context) => {
  onGlobalSetup(() => {
    provide(DefaultApolloClient, app.apolloProvider?.defaultClient)
    provideApolloClient(app.apolloProvider?.defaultClient)
  })
})
