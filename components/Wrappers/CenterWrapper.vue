<template>
  <div :class="$style['notch-wrapper']">
    <div :class="[$style['center-wrapper'], $style['center-wrapper-' + size]]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'xlg'
    }
  }
}
</script>

<style lang="postcss" module>
.notch-wrapper {
  padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
}

.center-wrapper {
  width: 100%;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  margin: 0 auto;
}

.center-wrapper-xlg {
  max-width: var(--container-width-xlg);
}

.center-wrapper-lg {
  max-width: var(--container-width-lg);
}
</style>
