<script setup lang="ts">
const {
  submit,
  paymentMethod,
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
      v-model:houseNumberSuffix="billing.houseNumberSuffix"
      v-model:postcode="billing.postcode"
    />
    <payment-gateways v-model="paymentMethod" ways />
  </app-form>
</template>
