<template>
  <div class="field">
    <label :for="id" class="label">{{ title }}</label>
    <slot />
    <form-error-message :error="errorMessage" />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const errorMessage = computed(() =>
      props.errors.map((error) => error.$message).join(', '),
    )
    return {
      errorMessage,
    }
  },
})
</script>
