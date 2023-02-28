<template>
  <div>
    <h1 v-html="title" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
