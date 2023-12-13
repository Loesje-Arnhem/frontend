<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import type { CustomerAddressInput } from '~/graphql/__generated__/graphql'

defineEmits(['update:firstName', 'update:lastName', 'update:company'])

const props = defineProps<
  CustomerAddressInput & {
    id: string
  }
>()

const { required } = useValidators()

const rules = {
  firstName: { required },
  lastName: { required },
}
const v$ = useVuelidate(rules, props)
</script>

<template>
  <form-fieldset title="Factuurgegevens" class="fields">
    <input-text-field
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
    <input-text-field
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
    <input-text-field
      :id="`${id}-companyName`"
      :model-value="company ?? ''"
      class="company-name"
      title="Bedrijfsnaam"
      name="companyName"
      @input="$emit('update:company', $event.target.value)"
    />
  </form-fieldset>
</template>

<style lang="postcss" scoped>
.fields {
  & :deep(.fields) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.company-name {
  grid-column: span 2;
}
</style>
