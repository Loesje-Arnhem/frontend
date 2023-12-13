<script setup lang="ts">
import { GetPageByID } from '~/graphql/pages'

defineI18nRoute({
  paths: {
    nl: '/winkeltje/afrekenen',
  },
})

const payment = ref('')

const { pageIds } = useAppConfig()

const { data } = await useAsyncQuery(GetPageByID, {
  id: pageIds.checkout.toString(),
})

const submit = () => {}

const {
  // checkout,
  // paymentMethod,
  billing,
  // shipping,
  // shipToDifferentAddress,
  // addToNewsletter,
  loading,
  errors,
} = useCheckout()
</script>

<template>
  <app-form
    class="form"
    button-title="Bestelling plaatsen"
    :loading="loading"
    :error="errors.join('')"
    @submit="submit"
  >
    <h1 v-if="data">{{ data.page?.title }}</h1>
    <personal-info-fields
      id="billing"
      v-model:firstName="billing.firstName"
      v-model:last-name="billing.lastName"
      v-model:company="billing.company"
    />

    <address-fields
      id="billing"
      v-model:city="billing.city"
      v-model:street="billing.street"
      v-model:houseNumber="billing.houseNumber"
      v-model:postcode="billing.postcode"
    />

    <payment-gateways v-model="payment" />
  </app-form>
</template>
