<template>
  <div>
    <h1>Accountgegevens</h1>
    <app-loader v-if="loading" />
    <address-fields v-else-if="customer" :user="customer.shipping" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useCustomer from '~/composables/useCustomer'

export default defineComponent({
  middleware: ['auth'],

  setup() {
    const { customer, loading } = useCustomer()

    return {
      loading,
      customer,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/winkeltje/mijn-account/accountgegevens',
    },
  },
})
</script>
