<template>
  <router-link :to="`/posters/${poster.slug}`">
    <app-image
      class="poster"
      width="200"
      height="500"
      src="https://www.loesje.nl/wp-content/uploads/2019/07/190723-alles-heter-300x424.jpg"
      :alt="poster.title.rendered"
    />
    {{ poster.title.rendered }}
  </router-link>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'
export default {
  components: {
    AppImage
  },
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
