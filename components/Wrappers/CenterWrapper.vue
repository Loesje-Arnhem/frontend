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

.wrapper-md {
  --wrapper-width: var(--container-width-md);
}

.wrapper-lg {
  --wrapper-width: var(--container-width-lg);
}

.wrapper-xlg {
  --wrapper-width: var(--container-width-xlg);
}

.wrapper {
  padding-inline: var(--gutter);
  margin-inline: max(0em, ((100% - var(--wrapper-width)) / 2));
}
</style>
