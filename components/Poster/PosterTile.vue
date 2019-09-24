<template>
  <router-link :to="`/posters/${poster.slug}`" class="link">
    <app-image
      class="poster"
      width="200"
      height="500"
      :alt="poster.title"
      :src="image"
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
      if (this.poster.featuredImage) {
        return this.poster.featuredImage.medium
      }
      return 'https://api.loesje.michielkoning.nl/wp-content/uploads/2019/06/190626-zomer-212x300.jpg'
    }
  }
}
</script>

<style lang="postcss" scoped>
.poster {
  display: block;
  width: 100%;
  height: auto;

  --rough-stroke-width: 3px;
  --rough-roughness: 1.5;
  border: var(--rough-stroke-width) solid var(--rough-stroke);
  @nest .is-loaded & {
    @supports (border-image-source: paint(rough-boxes)) {
      border-image-source: paint(rough-boxes);
      border-image-slice: 0 fill;
      border-image-outset: 1em;
    }
  }
}

.link {
  @mixin link-reset;
  transition: all 0.15s ease-in-out;
  display: block;

  &:focus,
  &:hover {
    transform: scale(1.05);
  }
}
</style>
