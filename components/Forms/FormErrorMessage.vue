<template>
  <span aria-live="assertive">{{ error }}</span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    error: {
      type: String,
      default: '',
    },
  },
})
</script>
