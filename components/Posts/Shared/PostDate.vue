<template>
  <app-date :date="date" :class="$style.date" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    date: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="postcss" module>
.date {
  font-size: 0.9em;
  display: block;
}
</style>
