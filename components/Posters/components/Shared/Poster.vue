<template>
  <img
    class="poster__image"
    :src="poster.fimg_url"
    :alt="poster.title.rendered "
  >
</template>

<script>
export default {
  props: {
    poster: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
