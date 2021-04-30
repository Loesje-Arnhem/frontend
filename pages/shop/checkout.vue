<template>
  <center-wrapper>
    <form class="form" @submit.prevent="checkout">
      <h1 v-if="page">{{ page.title }}</h1>
      <div class="checkout">
        <address-fields />
        <mini-cart />
      </div>
      <payment-gateways
        v-if="paymentGateways.edges.length"
        :payment-gateways="paymentGateways.edges"
      />
      <app-button type="submit" :disabled="loading">
        Bestelling plaatsen
      </app-button>
    </form>
  </center-wrapper>
</template>

<script>
import PaymentGatewaysQuery from '~/graphql/Shop/PaymentGateways.gql'
import { useCheckout } from '~/compositions/checkout'
import { checkoutPageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import getSeoMetaData from '~/utils/seo'

export default {
  setup() {
    const { checkout, loading } = useCheckout()
    return {
      loading,
      checkout,
    }
  },
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider

    const page = await defaultClient.query({
      query: PageByIdQuery,
      variables: {
        id: checkoutPageId,
      },
    })
    const result = await defaultClient.query({
      query: PaymentGatewaysQuery,
    })
    return {
      paymentGateways: result.data.paymentGateways,
      page: page.data.page,
    }
  },
  head() {
    return getSeoMetaData(this.page.seo)
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/afrekenen',
    },
  },
}
</script>

<style scoped lang="postcss">
.checkout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
}
</style>
