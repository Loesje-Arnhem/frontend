<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'

defineI18nRoute({
  paths: {
    nl: '/winkeltje/afrekenen',
  },
})

const payment = ref('')

const houseNumberSuffix = ref('')

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

const v$ = useVuelidate()

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }
}
</script>

<template>
  <app-form
    class="form"
    button-title="Bestelling plaatsen"
    :loading="loading"
    :error="errors.join('')"
    @submit="submit"
  >
    {{ houseNumberSuffix }}
    <personal-info-fields
      id="billing"
      v-model:firstName="billing.firstName"
      v-model:last-name="billing.lastName"
      v-model:company="billing.company"
      v-model:houseNumberSuffix="houseNumberSuffix"
    />

    <!-- <address-fields
      id="billing"
      v-model:city="billing.city"
      v-model:street="billing.street"
      v-model:houseNumber="billing.houseNumber"
      v-model:postcode="billing.postcode"
    />-->

    <payment-gateways v-model="payment" />
  </app-form>
</template>
