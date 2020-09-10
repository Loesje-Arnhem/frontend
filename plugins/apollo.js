import { provide, reactive } from '@nuxtjs/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'

const provideApollo = ({ app }) => {
  app.setup = () => {
    // since plugin is eval'd after module app.apolloProvider will always be defined
    const clients = reactive(app.apolloProvider?.clients)
    provide(DefaultApolloClient, clients?.defaultClient)
    // not functionally important but req'd return type
    return { DefaultApolloClient }
  }
}

export default provideApollo
