import { onGlobalSetup, defineNuxtPlugin } from '@nuxtjs/composition-api'
import { provideApolloClient } from '@vue/apollo-composable'
import { Context } from '@nuxt/types'

/**
 * This plugin will connect @nuxt/apollojs with @vue/apollo-composable
 */
export default defineNuxtPlugin(({ app }: Context) => {
  onGlobalSetup(() => {
    provideApolloClient(app.apolloProvider?.defaultClient)
  })
})
