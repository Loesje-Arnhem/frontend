<script lang="ts" setup>
import { ErrorObject } from '@vuelidate/core';

withDefaults(
  defineProps<{
    title: string
    description?: string | null
    id: string
    type?: 'text' | 'date' | 'email' | 'time' | 'number' | 'password' | 'tel'
    modelValue: string | number
    errors?: ErrorObject[]
  }>(),
  {
    type: 'text',
    description: null,
    errors: () => []
  },
)

defineEmits(['keyup-down', 'keyup-up', 'update:modelValue', 'change', 'blur'])
</script>

<template>
  <form-field
    :id="id"
    :errors="errors"
    :title="title"
    class="field"
    :description="description"
  >
    <input
      :id="id"
      v-bind="$attrs"
      :value="modelValue"
      :type="type"
      class="input"
      @keyup.down="$emit('keyup-down')"
      @keyup.up="$emit('keyup-up')"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur')"
    >
  </form-field>
</template>
