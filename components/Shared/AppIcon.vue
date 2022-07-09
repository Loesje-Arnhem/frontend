<template>
  <svg-icon
    :name="icon"
    class="icon"
    :width="width"
    :height="height"
    aria-hidden="true"
    :title="title"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: 24,
    },
    height: {
      type: [String, Number],
      default: 24,
    },
  },
})
</script>

<style scoped lang="postcss">
.icon {
  display: inline-block;
  fill: currentcolor;
  position: relative;
}
</style>
