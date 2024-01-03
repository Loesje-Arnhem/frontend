<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'
import { type Option } from '~/types/Option'

defineOptions({
  inheritAttrs: false,
})

withDefaults(
  defineProps<{
    title: string
    description?: string | null
    id: string
    modelValue: string | number
    errors?: ErrorObject[]
    options: Option[]
  }>(),
  {
    description: null,
    errors: () => [],
  },
)

defineEmits(['update:modelValue', 'change', 'blur'])
</script>

<template>
  <form-field
    :id="id"
    :errors="errors"
    :title="title"
    class="field"
    :description="description"
  >
    <div class="form-select">
      <select
        :id="id"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @change="$emit('change', $event.target.value)"
      >
        <slot />
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === modelValue"
        >
          {{ option.title }}
        </option>
      </select>
      <app-icon icon="chevron-down" class="icon" :width="24" :height="24" />
    </div>
  </form-field>
</template>

<style lang="postcss" scoped>
.form-select {
  position: relative;
}

.icon {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  pointer-events: none;
}
</style>
