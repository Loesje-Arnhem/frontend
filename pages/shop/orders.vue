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
      </ul>
    </template>
    <h1>Bestellingen</h1>

    <app-loader v-if="loading" />
    <div v-else-if="customer">
      <ul v-if="customer.orders.edges.length">
        <li v-for="order in customer.orders.edges" :key="order.node.id">
          {{ order }}
        </li>
      </ul>
    </div>
  </page-with-sidebar>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import {
  provideApolloClient,
  useQuery,
  useResult,
} from '@vue/apollo-composable/dist'
import CustomerQuery from '~/graphql/Customer/Orders.gql'

export default defineComponent({
  setup() {
    const { app } = useContext()
    provideApolloClient(app.apolloProvider?.defaultClient)

    const { error, loading, onError, onResult, result } =
      useQuery(CustomerQuery)
    const customer = useResult(result)

    return {
      onResult,
      customer,
      error,

      loading,
      onError,
    }
  },
})
</script>
