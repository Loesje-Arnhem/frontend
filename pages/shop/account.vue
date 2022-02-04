<template>
  <page-with-sidebar>
    <template #sidebar>
      <ul>
        <li>Dashboard</li>
        <li>
          <nuxt-link :to="localePath({ name: 'shop-orders' })"
            >Bestellingen</nuxt-link
          >
        </li>
        <li>Adres</li>
        <li>
          <nuxt-link :to="localePath({ name: 'shop-account' })"
            >Accountgegevens</nuxt-link
          >
        </li>
        <li><app-button @click="logout">logout</app-button></li>
      </ul>
    </template>
    <app-loader v-if="loading" />
    <address-fields v-else-if="customer" :user="customer.shipping" />
  </page-with-sidebar>
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
      router.push(app.localePath({ name: 'shop-login' }))
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
