<template>
  <div>
    <div id="el">
      <div class="el">
        <app-image
          class="border"
          :alt="poster.title"
          :src="image"
          :class="$style.poster"
          width="200"
          height="500"
        />
      </div>
    </div>
    <router-link :to="poster.uri" :class="$style.link">
      <app-image
        class="border"
        :alt="poster.title"
        :src="image"
        :class="$style.poster"
        width="200"
        height="500"
      />
    </router-link>
  </div>
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

<style lang="postcss" scoped>
/* stylelint-disable */

.el {
  border: var(--rough-stroke-width) solid var(--rough-stroke);
  --rough-stroke: black;
  --rough-stroke-width: 2px;
  --rough-roughness: 7;
  padding: 0.25em;
}

@supports (border-image-source: paint(rough-boxes)) {
  .is-loaded .el {
    border-image-source: paint(rough-boxes);
    border-image-slice: 0 fill;
    border-image-outset: 10px;
    background: none;
    --rough-fill: #fff;
  }
}
</style>

<style lang="postcss" module>
.poster {
  display: block;
  width: 100%;
}

.link {
  @mixin link-reset;

  transition: all 0.15s ease-in-out;
  display: block;
  border: var(--rough-stroke-width) solid var(--rough-stroke);
  --rough-stroke: black;
  --rough-stroke-width: 2px;
  --rough-roughness: 7;
  padding: 0.25em;

  @mixin hover {
    transform: scale(1.05);
  }
}

@supports (border-image-source: paint(rough-boxes)) {
  :global(.is-loaded) .link {
    border-image-source: paint(rough-boxes);
    border-image-slice: 0 fill;
    border-image-outset: 10px;
    background: none;
    --rough-fill: #fff;
  }
}
</style>
