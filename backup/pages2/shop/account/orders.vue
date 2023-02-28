<template>
  <div>
    <h1>Bestellingen</h1>

    <app-loader v-if="loading" />
    <div v-else-if="orders">
      <table v-if="orders.edges.length">
        <thead>
          <tr>
            <th>Bestelling</th>
            <th>Datum</th>
            <th>Status</th>
            <th>Totaal</th>
            <th>Acties</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order in orders.edges" :key="order.node.id">
            <td>
              <a href="https://www.loesje.nl/mijn-account/view-order/81706/">
                {{ order.node.orderNumber }}
              </a>
            </td>
            <td>
              <app-date :date="order.node.date" />
            </td>
            <td>{{ order.node.status }}</td>
            <td>
              {{ order.node.total }}
              voor 1 artikel
            </td>
            <td>
              <a
                href="https://www.loesje.nl/mijn-account/view-order/81706/"
                class="woocommerce-button button view"
                >Bekijken</a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <load-more-by-click
        v-if="hasNextPage"
        :loading="loading"
        :title="$t('btnMore')"
        @load-more="loadMore"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import OrdersQuery from '~/graphql/Customer/Orders'

export default defineComponent({
  middleware: ['auth'],

  setup() {
    const { error, loading, onError, onResult, result, fetchMore } =
      useQuery(OrdersQuery)
    const orders = useResult(result)

    const loadMore = async () => {
      const { endCursor } = orders.value.pageInfo
      await fetchMore({
        variables: {
          // @ts-ignore
          after: endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            orders: {
              ...previousResult.orders,
              pageInfo: fetchMoreResult.orders.pageInfo,
              edges: [
                ...previousResult.orders.edges,
                ...fetchMoreResult.orders.edges,
              ],
            },
          }
        },
      })
    }

    const hasNextPage = computed(() => {
      if (!orders.value) return true
      return orders.value.pageInfo.hasNextPage
    })

    return {
      onResult,
      loadMore,
      orders,
      error,
      hasNextPage,
      loading,
      onError,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/mijn-account/bestellingen',
    },
  },
})
</script>

<i18n>
{
  "nl": {
    "btnMore": "Toon meer bestellingen"
  }
}
</i18n>
