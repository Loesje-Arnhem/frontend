await navigateTo(response.payment_result.redirect_url)
<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import type { NuxtError } from '#app'
import type { BillingAdress, ShippingAddress } from '~/types/Cart'

const billing = reactive({
  first_name: 'Michiel',
  last_name: 'Koning',
  company: '',
  address_1: 'Oudlaan',
  address_2: '',
  city: 'Wageningen',
  state: '',
  postcode: '6708RC',
  country: 'NL',
  email: 'mail@michielkoning.nl',
  phone: '06123456789',
  houseNumber: '35',
  houseNumberSuffix: 'b'
})

const shipping = reactive({
  first_name: '',
  last_name: '',
  company: '',
  address_1: '',
  address_2: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  phone: '',
  houseNumber: '',
  houseNumberSuffix: ''

})

const v$ = useVuelidate()

const shipToDifferentAddress = ref(false)
const addToNewsletter = ref(false)
const paymentMethod = ref('')

const cartState = useCartState()

const houseNumberSuffix = ref('')

const pending = ref(false)
const errorMessage = ref<string | null>(null)

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }

  pending.value = true
  errorMessage.value = null

  try {
    const response = await $fetch('/api/checkout/checkout', {
      method: 'POST',
      body: {
        shipping_address: shipping,
        billing_address: billing,
        payment_method: paymentMethod.value,
        shipToDifferentAddress: shipToDifferentAddress.value,
      },
    })

    if (!cartState.value) {
      return
    }

    cartState.value.billing_address = response.billing_address
    cartState.value.shipping_address = response.shipping_address

    Object.assign(billing, response.billing_address)
    Object.assign(shipping, response.shipping_address)

    // await navigateTo(response.payment_result.redirect_url, { external: true })
  }
  catch (error) {
    errorMessage.value = error.data.data.message
  }
  finally {
    pending.value = false
  }
}

// if (cartState.value) {
//   Object.assign(billing, cartState.value.billing_address)
//   Object.assign(shipping, cartState.value.shipping_address)
// }
</script>

<template>
  <app-form
    button-title="Bestelling plaatsen"
    :loading="pending"
    :error="errorMessage"
    @submit="submit"
  >
    <personal-info-fields
      id="billing"
      v-model:firstName="billing.first_name"
      v-model:last-name="billing.last_name"
      v-model:email-address="billing.email"
      v-model:company="billing.company"
    />
    <address-fields
      id="billing"
      v-model:city="billing.city"
      v-model:street="billing.address_1"
      v-model:houseNumber="billing.houseNumber"
      v-model:houseNumberSuffix="billing.houseNumberSuffix"
      v-model:postcode="billing.postcode"
      v-model:country="billing.country"
      v-model:address1="billing.address_1"
      v-model:address2="billing.address_2"
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
        v-model:street="shipping.address_1"
        v-model:houseNumber="shipping.houseNumber"
        v-model:houseNumberSuffix="shipping.houseNumberSuffix"
        v-model:postcode="shipping.postcode"
        v-model:country="shipping.country"
        v-model:address1="shipping.address_1"
        v-model:address2="shipping.address_2"
      />
    </slide-in-animation>
    <payment-gateways v-model="paymentMethod" />
  </app-form>
</template>
