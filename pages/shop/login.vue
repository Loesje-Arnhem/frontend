<template>
  <form-login />
</template>

<script>
import { useContext, defineComponent } from '@nuxtjs/composition-api'
import { provideApolloClient } from '@vue/apollo-composable/dist'
export default defineComponent({
  setup() {
    const { app } = useContext()
    provideApolloClient(app.apolloProvider?.defaultClient)
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/inloggen',
    },
  },
})
</script>
