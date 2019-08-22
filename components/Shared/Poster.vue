<template>
  <router-link :to="`/posters/${poster.slug}`">
    <img class="poster" :src="poster.fimg_url" :alt="poster.title.rendered" />
  </router-link>
</template>

<script>
export default {
  props: {
    poster: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="postcss" scoped>
.poster {
  border-radius: 0.2em;
  border: 0.2em solid var(--color-black);
  display: block;
  width: 100%;
  height: auto;
  border-radius: 50% 4% 20% 1%/5% 50% 2% 45%;
  border-bottom-width: 0.25em;
  border-left-width: 0.25em;
}
</style>
