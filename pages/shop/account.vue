<template>
  <center-wrapper>
    <app-loader v-if="loading" />
    <address-fields v-else-if="customer" :user="customer.shipping" />

    <app-button @click="logout">logout</app-button>
  </center-wrapper>
</template>

<script>
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api'
import { provideApolloClient } from '@vue/apollo-composable/dist'
import useCustomer from '~/composables/useCustomer'

export default defineComponent({
  middleware: ['isAuth'],
  setup() {
    const { app, $apolloHelpers } = useContext()
    provideApolloClient(app.apolloProvider?.defaultClient)

    const router = useRouter()

    const { customer, loading } = useCustomer()

    const logout = async () => {
      await $apolloHelpers.onLogout()
      router.push('/winkeltje/inloggen')
    }

    return {
      loading,
      logout,
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
