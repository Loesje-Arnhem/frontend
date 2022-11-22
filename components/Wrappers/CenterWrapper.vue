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
  padding-inline: env(safe-area-inset-right) env(safe-area-inset-left);

  &.top {
    padding-top: env(safe-area-inset-top);
  }
}

.wrapper-sm {
  --wrapper-width: var(--container-width-sm);
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
  /* stylelint-disable-next-line length-zero-no-unit */
  --zero: 0px;

  padding-inline: var(--gutter);
  margin-inline: max(var(--zero), ((100% - var(--wrapper-width)) / 2));
}
</style>
