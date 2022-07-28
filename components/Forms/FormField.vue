<template>
  <div class="field">
    <label :for="id" class="label">{{ title }}</label>
    <slot />
    <form-error-message :error="errorMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { ErrorObject } from '@vuelidate/core'

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
      type: Array as PropType<ErrorObject[]>,
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
