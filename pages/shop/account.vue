<template>
  <div>
    {{ customer }}
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { provideApolloClient } from '@vue/apollo-composable/dist'
import useCustomer from '~/composables/useCustomer'

export default defineComponent({
  middleware: ['isAuth'],
  setup() {
    const { app } = useContext()
    provideApolloClient(app.apolloProvider?.defaultClient)
    const { customer } = useCustomer()
    return {
      customer,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/account',
    },
  },
})
</script>
