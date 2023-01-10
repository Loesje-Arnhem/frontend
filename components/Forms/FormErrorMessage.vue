<template>
  <span aria-live="assertive" class="error">{{ $t(error) }}</span>
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

<style lang="postcss" scoped>
.error {
  display: block;
}
</style>
