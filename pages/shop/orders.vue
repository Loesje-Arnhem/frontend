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
      <table v-if="customer.orders.edges.length">
        <thead>
          <tr>
            <th class="">
              <span class="nobr">Bestelling</span>
            </th>
            <th class="">
              <span class="nobr">Datum</span>
            </th>
            <th class="">
              <span class="nobr">Status</span>
            </th>
            <th class="">
              <span class="nobr">Totaal</span>
            </th>
            <th class="">
              <span class="nobr">Acties</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order in customer.orders.edges" :key="order.node.id">
            <td class="" data-title="Bestelling">
              <a href="https://www.loesje.nl/mijn-account/view-order/81706/">
                {{ order.node.orderNumber }}
              </a>
            </td>
            <td class="" data-title="Datum">
              <time :datetime="order.node.date">
                $d(order.node.date, 'short')
              </time>
            </td>
            <td class="" data-title="Status">{{ order.node.status }}</td>
            <td class="" data-title="Totaal">
              {{ order.node.total }}
              voor 1 artikel
            </td>
            <td class="" data-title="Acties">
              <a
                href="https://www.loesje.nl/mijn-account/view-order/81706/"
                class="woocommerce-button button view"
                >Bekijken</a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <ul v-if="customer.orders.edges.length">
        <li v-for="order in customer.orders.edges" :key="order.node.id">
          {{ order }}
        </li>
      </ul>
    </div>
  </page-with-sidebar>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import OrdersQuery from '~/graphql/Customer/Orders'

export default defineComponent({
  setup() {
    const { error, loading, onError, onResult, result } = useQuery(OrdersQuery)
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
