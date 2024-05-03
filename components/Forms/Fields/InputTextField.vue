<script lang="ts" setup>
import { type ErrorObject } from '@vuelidate/core'

defineOptions({
  inheritAttrs: false,
})

withDefaults(
  defineProps<{
    title: string
    description?: string | null
    name: string
    id: string
    type?: 'text' | 'date' | 'email' | 'time' | 'password' | 'tel'
    errors?: ErrorObject[]
  }>(),
  {
    type: 'text',
    description: null,
    errors: () => [],
  },
)
defineEmits(['keyup-down', 'keyup-up', 'change', 'blur'])

const model = defineModel({ required: true })
</script>

<template>
  <form-field :id :errors="errors" :title="title" :description="description">
    <input
      v-bind="$attrs"
      :id
      v-model="model"
      :name
      :type
      class="input"
      @keyup.down="$emit('keyup-down')"
      @keyup.up="$emit('keyup-up')"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur')"
    />
  </form-field>
</template>
