<script lang="ts" setup>
defineProps<{
  title: string
  description?: string
  id: string
  type: 'text' | 'date' | 'email'
  modelValue: string | number
  errors?: []
}>()

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
    <input
      :id="id"
      v-bind="$attrs"
      :model-value="modelValue"
      :type="type"
      class="input"
      @keyup.down="$emit('keyup-down')"
      @keyup.up="$emit('keyup-up')"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur')"
    />
  </form-field>
</template>
