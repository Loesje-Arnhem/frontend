<script setup lang="ts">
const {
  submit,
  paymentMethod,
  billing,
  shipping,
  shipToDifferentAddress,
  addToNewsletter,
  loading,
  errors,
} = useCheckout()
</script>

<template>
  <app-form
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
      v-model:country="billing.country"
    />
    <checkbox-field
      id="add-to-newsletter"
      v-model="addToNewsletter"
      title="Ik meld me aan voor de nieuwbrief"
    />
    <checkbox-field
      id="ship-to-different-address"
      v-model="shipToDifferentAddress"
      title="Verzenden naar een ander adres?"
    />
    <slide-in-animation>
      <address-fields
        v-if="shipToDifferentAddress"
        id="shipping"
        v-model:city="shipping.city"
        v-model:street="shipping.street"
        v-model:houseNumber="shipping.houseNumber"
        v-model:houseNumberSuffix="shipping.houseNumberSuffix"
        v-model:postcode="shipping.postcode"
        v-model:country="shipping.country"
      />
    </slide-in-animation>

    <payment-gateways v-model="paymentMethod" ways />
  </app-form>
</template>
