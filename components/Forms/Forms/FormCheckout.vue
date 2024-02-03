<script setup lang="ts">
const billing = reactive({
  street: '',
  houseNumber: '',
  houseNumberSuffix: '',
  city: '',
  company: '',
  country: '',
  email: '',
  firstName: '',
  lastName: '',
  postcode: '',
  address1: '',
  address2: '',
})

const shipping = reactive({
  street: '',
  houseNumber: '',
  houseNumberSuffix: '',
  city: '',
  company: '',
  country: '',
  email: '',
  firstName: '',
  lastName: '',
  postcode: '',
  address1: '',
  address2: '',
})

const loading = ref(false)
const errors = ref([])
const submit = () => {}
const shipToDifferentAddress = ref(false)
const addToNewsletter = ref(false)
const paymentMethod = ref('')
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
      v-model:email="billing.email"
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
      v-model:address1="billing.address1"
      v-model:address2="billing.address2"
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
        v-model:address1="shipping.address1"
        v-model:address2="shipping.address2"
      />
    </slide-in-animation>

    <!-- <payment-gateways v-model="paymentMethod" ways /> -->
  </app-form>
</template>
