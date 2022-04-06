<template>
  <svg-icon
    :name="icon"
    :class="$style.icon"
    :width="width"
    :height="height"
    aria-hidden="true"
    :title="title"
  />
</template>

<script>
export default {
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
}
</script>

<style module lang="postcss">
.icon {
  display: inline-block;
  fill: currentcolor;
  position: relative;
}
</style>
