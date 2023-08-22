<script lang="ts" setup>
import { ErrorObject } from '@vuelidate/core'

withDefaults(
  defineProps<{
    title: string
    description?: string | null
    id: string
    modelValue: string | number
    errors?: ErrorObject[]
  }>(),
  {
    description: null,
    errors: () => [],
  },
)

defineEmits(['keyup-down', 'keyup-up', 'input', 'change', 'blur'])
</script>

<template>
  <form-field
    :id="id"
    :errors="errors"
    :title="title"
    class="field"
    :description="description"
  >
    <textarea
      :id="id"
      v-bind="$attrs"
      :model-value="modelValue"
      @keyup.down="$emit('keyup-down')"
      @keyup.up="$emit('keyup-up')"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur')"
    />
  </form-field>
</template>
