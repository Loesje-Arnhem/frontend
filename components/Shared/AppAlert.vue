<template>
  <div class="alert">
    <center-wrapper>
      <slot />
    </center-wrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'warning',
    },
  },
})
</script>

<style scoped lang="postcss">
.alert {
  z-index: 999;
  background-color: var(--color-white);
  padding-block: 0.5em;
  line-height: 1.2;
  position: fixed;
  inset: auto 0 0;
  border: 1px solid var(--color-black);
  text-align: center;
}
</style>
