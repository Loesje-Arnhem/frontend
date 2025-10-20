<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string | null
    id: string
    errors?: ErrorObject[]
  }>(),
  {
    description: null,
    errors: () => [],
  },
)

const errorMessage = computed(() => {
  if (!props.errors.length) {
    return ''
  }
  return props.errors.map(error => error.$message).join(', ')
})
</script>

<template>
  <div class="field">
    <label
      :for="id"
      class="label"
    >{{ title }}</label>
    <slot />
    <form-error-message :error="errorMessage" />
    <div
      v-if="description"
      class="description"
    >
      {{ description }}
    </div>
  </div>
</template>

<style scoped>
.label {
  display: block;
  margin-bottom: 0.25em;
  font-weight: var(--font-weight-bold);
}

.description {
  margin-bottom: 0.5em;
}
</style>
