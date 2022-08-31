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

.wrapper-xlg {
  --wrapper-witdh: var(--container-width-xlg);
}

.wrapper-lg {
  --wrapper-witdh: var(--container-width-lg);
}

.wrapper-md {
  --wrapper-witdh: var(--container-width-md);
}

.wrapper {
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  margin-inline: max(0px, ((100% - var(--wrapper-witdh)) / 2));
}
</style>
