<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'

defineEmits([
  'update:firstName',
  'update:lastName',
  'update:email',
  'update:company',
])

const props = defineProps<{
  firstName: string
  lastName: string
  company: string
  email: string
  id: string
}>()

const { required, email } = useValidators()

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
}
const v$ = useVuelidate(rules, props)
</script>

<template>
  <form-fieldset
    title="Factuurgegevens"
    class="fields"
  >
    <input-text-field
      :id="`${id}-firstName`"
      :model-value="firstName"
      title="Voornaam"
      class="first-name"
      name="firstName"
      :errors="v$.firstName.$errors"
      autocomplete="given-name"
      @input="$emit('update:firstName', $event.target.value)"
      @change="$emit('update:firstName', $event.target.value)"
    />
    <input-text-field
      :id="`${id}-lastName`"
      :model-value="lastName"
      title="Achternaam"
      class="last-name"
      name="lastName"
      :errors="v$.lastName.$errors"
      autocomplete="family-name"
      @input="$emit('update:lastName', $event.target.value)"
      @change="$emit('update:lastName', $event.target.value)"
    />
    <input-text-field
      :id="`${id}-email`"
      type="email"
      :model-value="email"
      class="email"
      title="E-mailadres"
      name="email"
      :errors="v$.email.$errors"
      autocomplete="email"
      @input="$emit('update:email', $event.target.value)"
    />
    <input-text-field
      :id="`${id}-companyName`"
      :model-value="company"
      class="company-name"
      title="Bedrijfsnaam"
      name="companyName"
      @input="$emit('update:company', $event.target.value)"
    />
  </form-fieldset>
</template>

<style scoped>
@import "~/assets/css/media-queries/media-queries.css";

.fields {
  & :deep(.fields) {
    @media (--viewport-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
