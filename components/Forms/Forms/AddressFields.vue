<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import type { CustomerAddressInput } from '~/graphql/__generated__/graphql'

defineEmits(['update:firstName', 'update:lastName', 'update:company'])

const props = defineProps<
  CustomerAddressInput & {
    id: string
  }
>()

const { data, execute, pending } = useFetch('/api/address', {
  query: {
    postcode: '671a5JH',
    houseNumber: '42',
  },
  immediate: false,
})

const { required } = useValidators()

const rules = {
  firstName: { required },
  lastName: { required },
}
const v$ = useVuelidate(rules, props)
</script>

<template>
  <form-fieldset title="Factuurgegevens" class="fields">
    <button @click="execute()">fetchAddress {{ pending }} {{ data }}</button>
    <form-input-text
      :id="`${id}-firstName`"
      :model-value="firstName ?? ''"
      title="Voornaam"
      class="first-name"
      name="firstName"
      :errors="v$.firstName.$silentErrors"
      autocomplete="given-name"
      @input="$emit('update:firstName', $event.target.value)"
      @change="$emit('update:firstName', $event.target.value)"
    />
    <form-input-text
      :id="`${id}-lastName`"
      :model-value="lastName ?? ''"
      title="Achternaam"
      class="last-name"
      name="lastName"
      :errors="v$.lastName.$silentErrors"
      autocomplete="family-name"
      @input="$emit('update:lastName', $event.target.value)"
      @change="$emit('update:lastName', $event.target.value)"
    />
    <form-input-text
      :id="`${id}-companyName`"
      :model-value="company ?? ''"
      class="company-name"
      title="Bedrijfsnaam"
      name="companyName"
      @input="$emit('update:company', $event.target.value)"
    />
  </form-fieldset>
</template>
