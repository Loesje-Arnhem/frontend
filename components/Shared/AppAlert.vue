<template>
  <slide-in-animation direction="down">
    <div v-if="show" class="alert">
      <div class="wrapper" role="alert">
        <center-wrapper>
          {{ text }}
          <slot />
        </center-wrapper>
      </div>
    </div>
  </slide-in-animation>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped lang="postcss">
.alert {
  z-index: var(--z-alert);
  background-color: var(--color-white);
  padding-block: 0.5em;
  line-height: 1.2;
  position: fixed;
  inset: auto 0 0;
  border: 1px solid var(--color-black);
  text-align: center;
}

.wrapper {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
