<template>
  <form-field
    :id="id"
    :error-message="errorMessage"
    :title="title"
    class="field"
    :description="description"
  >
    <textarea
      :id="id"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
    />
  </form-field>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
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
    value: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
})
</script>
