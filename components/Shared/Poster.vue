<template>
  <router-link :to="`/posters/${poster.slug}`" class="link">
    <app-image
      class="poster"
      width="200"
      height="500"
      :src="image"
      :alt="poster.title.rendered"
    />
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
  },
  computed: {
    image() {
      if (this.poster._embedded['wp:featuredmedia'][0].media_details) {
        return this.poster._embedded['wp:featuredmedia'][0].media_details.sizes
          .medium.source_url
      }
      return 'https://api.loesje.michielkoning.nl/wp-content/uploads/2019/06/190626-zomer-212x300.jpg'
    }
  }
}
</script>

<style lang="postcss" scoped>
.poster {
  border-radius: 0.2em;
  display: block;
  width: 100%;
  height: auto;
  border: 0.2em solid var(--color-black);
  border-radius: 50% 4% 20% 1%/5% 50% 2% 45%;
  border-bottom-width: 0.25em;
  border-left-width: 0.25em;
}

.link {
  transition: all 0.15s ease-in-out;
  display: block;

  &:focus,
  &:hover {
    transform: scale(1.05);
  }
}
</style>
