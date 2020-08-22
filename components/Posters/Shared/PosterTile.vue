<template>
  <router-link :to="`/posters/${poster.slug}`" :class="$style.link">
    <app-image
      :alt="poster.title"
      :src="image"
      :class="$style.poster"
      width="200"
      height="500"
    />
  </router-link>
</template>

<script>
import AppImage from '~/components/Shared/AppImage.vue'
export default {
  components: {
    AppImage,
  },
  props: {
    poster: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    image() {
      if (this.poster.featuredImage) {
        return this.poster.featuredImage.node.medium
      }
      return 'https://api.loesje.michielkoning.nl/wp-content/uploads/2019/06/190626-zomer-212x300.jpg'
    },
  },
}
</script>

<style lang="postcss" module>
.poster {
  @mixin tile-border;

  display: block;
  width: 100%;
}

.link {
  @mixin link-reset;

  transition: all 0.15s ease-in-out;
  display: block;

  @mixin hover {
    transform: scale(1.05);
  }
}
</style>
