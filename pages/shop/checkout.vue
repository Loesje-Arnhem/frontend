<template>
  <center-wrapper>
    <app-form
      class="form"
      button-title="Bestelling plaatsen"
      :loading="loading"
      :error="errors.join('')"
      @submit="submit"
    >
      <h1 v-if="page">{{ page.title }}</h1>
      <div class="checkout">
        <div>
          <address-fields
            :user="billing"
            @input="(key, value) => (billing[key] = value)"
          />

          <input
            id="shipToDifferentAddress"
            v-model="shipToDifferentAddress"
            type="checkbox"
          />
          <label for="shipToDifferentAddress">
            Verzenden naar een ander adres?
          </label>
          <slide-in-animation>
            <address-fields
              v-if="shipToDifferentAddress"
              :is-shipping="true"
              :user="shipping"
              @input="(key, value) => (shipping[key] = value)"
            />
          </slide-in-animation>
        </div>
        <client-only>
          <mini-cart />
        </client-only>
      </div>
      <input id="addToNewsletter" v-model="addToNewsletter" type="checkbox" />
      <label for="addToNewsletter"> Toevoegen aan niewsbrief </label>
      <payment-gateways
        v-if="paymentGateways.edges.length"
        v-model="paymentMethod"
        :payment-gateways="paymentGateways.edges"
      />
    </app-form>
  </center-wrapper>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import PaymentGatewaysQuery from '~/graphql/Shop/PaymentGateways.gql'
import { useCheckout } from '~/composables/checkout'
import { checkoutPageId } from '~/data/pages'
import { usePageById } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const {
      checkout,
      paymentMethod,
      billing,
      shipping,
      shipToDifferentAddress,
      addToNewsletter,
      errors,
    } = useCheckout()

    const { page, loading } = usePageById(checkoutPageId)

    // this will collect all nested component’s validation results
    const v$ = useVuelidate()

    const submit = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return
      checkout()
    }

    return {
      submit,
      v$,
      page,
      loading,
      shipToDifferentAddress,
      paymentMethod,
      billing,
      shipping,
      addToNewsletter,
      errors,
      checkout,
    }
  },
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider

    const result = await defaultClient.query({
      query: PaymentGatewaysQuery,
    })
    return {
      paymentGateways: result.data.paymentGateways,
    }
  },
  head() {},
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/afrekenen',
    },
  },
})
</script>

<style scoped lang="postcss">
.checkout {
  display: grid;
  grid-gap: 1em;

  @media (--viewport-lg) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
