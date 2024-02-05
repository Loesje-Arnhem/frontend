<script setup lang="ts">
import type { BillingAdress, ShippingAddress } from '~/types/Cart'

const cartState = useCartState()

const billing = reactive<BillingAdress>({
  first_name: '',
  last_name: '',
  company: '',
  address_1: '',
  address_2: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  email: '',
  phone: '',
})

const shipping = reactive<ShippingAddress>({
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
})

const errors = ref([])
const shipToDifferentAddress = ref(false)
const addToNewsletter = ref(false)
const paymentMethod = ref('')

const houseNumberSuffix = ref('')

const submit = async () => {
  await execute()
}

const { execute, status, error } = useFetch('/api/checkout/checkout', {
  method: 'POST',
  body: {
    shipping_address: shipping,
    billing_address: billing,
  },
  watch: false,
  immediate: false,
  transform: (response) => {
    cartState.value = response
  },
})

onMounted(() => {
  if (!cartState.value) {
    return
  }
  Object.assign(billing, cartState.value.billing_address)
  Object.assign(shipping, cartState.value.shipping_address)

  billing.first_name = 'first_name'
  billing.last_name = 'last_name'
  billing.company = 'company'
  billing.address_1 = 'address_1'
  billing.address_2 = 'address_2'
  billing.city = 'city'
  billing.state = 'state'
  billing.postcode = 'postcode'
  billing.country = 'DE'
  billing.email = 'email@michielkoning.nl'
  billing.phone = 'phone'

  shipping.first_name = 'first_name'
  shipping.last_name = 'last_name'
  shipping.company = 'company'
  shipping.address_1 = 'address_1'
  shipping.address_2 = 'address_2'
  shipping.city = 'city'
  shipping.state = 'state'
  shipping.postcode = 'postcode'
  shipping.country = 'DE'
  shipping.phone = 'phone'
})
</script>

<template>
  <app-form
    button-title="Bestelling plaatsen"
    :loading="status === 'pending'"
    :error="errors.join('')"
    @submit="submit"
  >
    <personal-info-fields
      id="billing"
      v-model:firstName="billing.first_name"
      v-model:last-name="billing.last_name"
      v-model:email="billing.email"
      v-model:company="billing.company"
    />
    <address-fields
      id="billing"
      v-model:city="billing.city"
      v-model:street="billing.address_1"
      v-model:houseNumber="billing.address_2"
      v-model:houseNumberSuffix="houseNumberSuffix"
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
        v-model:houseNumber="shipping.address_2"
        v-model:houseNumberSuffix="houseNumberSuffix"
        v-model:postcode="shipping.postcode"
        v-model:country="shipping.country"
        v-model:address1="shipping.address_1"
        v-model:address2="shipping.address_2"
      />
    </slide-in-animation>
    <payment-gateways v-model="paymentMethod" />
  </app-form>
</template>
