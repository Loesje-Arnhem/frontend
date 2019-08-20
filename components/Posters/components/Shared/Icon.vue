<template>
  <svg :width="width" :height="height" role="presentation">
    <title v-if="title" lang="nl">{{ title }}</title>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" v-bind="{ 'xlink:href': '#icon-' + icon}"></use>
  </svg>
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
      default: null,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
};
</script>

<style scoped>
svg {
  display: inline-block;
  fill: currentColor;
  position: relative;
  transform: translateY(0.1em);
}
</style>
