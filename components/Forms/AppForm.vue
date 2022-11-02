<template>
  <form action="" method="post" novalidate @submit.prevent="$emit('submit')">
    <slot />
    <app-button type="submit" :loading="loading">{{ buttonTitle }}</app-button>
    <form-error-message :error="error" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    buttonTitle: {
      type: String,
      default: 'Verzenden',
    },

    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
  },
})
</script>
