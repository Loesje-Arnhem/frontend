<template>
  <div :class="[$style.notch, { [$style.top]: top }]">
    <div :class="[$style['wrapper'], $style['wrapper-' + size]]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    size: {
      type: String,
      default: 'xlg',
    },
    top: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="postcss" module>
.notch {
  padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);

  &.top {
    padding-top: var(--notch-top);
  }
}

.wrapper {
  width: 100%;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  margin: 0 auto;
}

.wrapper-xlg {
  max-width: var(--container-width-xlg);
}

.wrapper-lg {
  max-width: var(--container-width-lg);
}

.wrapper-md {
  max-width: var(--container-width-md);
}
</style>
