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
      :value="value"
      :type="type"
      class="input"
      :maxlength="250"
      @keyup.down="$emit('keyup-down')"
      @keyup.up="$emit('keyup-up')"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur')"
    />
  </form-field>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: null,
    },
    maxlength: {
      type: Number,
      default: 250,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
})
</script>
