<template>
  <center-wrapper>
    <h1 v-if="page">{{ page.title }}</h1>
    <div class="checkout">
      <address-fields />
    </div>
    <ul v-if="paymentGateways.edges.length">
      <li
        v-for="paymentGateway in paymentGateways.edges"
        :key="paymentGateway.node.id"
      >
        <input
          :id="`payment-${paymentGateway.node.id}`"
          v-model="selectedPaymentGateway"
          type="radio"
          :value="paymentGateway.node.id"
          name="payment-gateways"
        />
        <label :for="`payment-${paymentGateway.node.id}`">
          {{ paymentGateway.node.title }}
        </label>
      </li>
    </ul>
    <app-button>Bestelling plaatsen</app-button>
  </center-wrapper>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import PaymentGatewaysQuery from '~/graphql/Shop/PaymentGateways.gql'
import { checkoutPageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import getSeoMetaData from '~/utils/seo'

export default {
  setup() {
    const selectedPaymentGateway = ref(null)
    return {
      selectedPaymentGateway,
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
