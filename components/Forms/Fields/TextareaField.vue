<script lang="ts" setup>
import { type ErrorObject } from '@vuelidate/core'

defineOptions({
  inheritAttrs: false,
})

withDefaults(
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

const model = defineModel({ required: true })
</script>

<template>
  <form-field
    :id
    :errors="errors"
    :title="title"
    class="field"
    :description="description"
  >
    <textarea
      :id
      v-bind="$attrs"
      v-model="model"
      @keyup.down="$emit('keyup-down')"
      @keyup.up="$emit('keyup-up')"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur')"
    />
  </form-field>
</template>
