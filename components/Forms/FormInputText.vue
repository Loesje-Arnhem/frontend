<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
    description?: string
    id: string
    type?: 'text' | 'date' | 'email' | 'time' | 'number' | 'password'
    modelValue: string | number
    errors?: []
  }>(),
  {
    type: 'text',
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
