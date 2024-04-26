<script lang="ts" setup>
withDefaults(
  defineProps<{
    size?: 'xlg' | 'full' | 'md' | 'lg' | 'sm'
    top?: boolean
  }>(),
  {
    top: false,
    size: 'xlg',
  },
)
</script>

<template>
  <div :class="[$style.notch, { [$style.top]: top }]">
    <div :class="[$style['wrapper'], $style['wrapper-' + size]]">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" module>
.notch {
  padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);

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
