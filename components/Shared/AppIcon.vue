<template>
  <svg-icon
    :name="icon"
    :class="$style.icon"
    :width="width"
    :height="height"
    aria-hidden="true"
  />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
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
}
</script>

<style module lang="postcss">
.icon {
  display: inline-block;
  fill: currentColor;
  position: relative;
  width: 1em;
  height: 1em;
}
</style>
