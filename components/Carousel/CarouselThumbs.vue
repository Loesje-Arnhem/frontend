<template>
  <ul :class="$style.thumbs">
    <template v-for="(image, index) in thumbs">
      <li
        v-if="image.thumbnail"
        :key="`thumb-${image.id}`"
        class="tile"
        :class="[$style.thumb, { [$style.active]: index === activeSlide }]"
        @click="goToSlideNumber(index)"
      >
        <img
          :src="image.thumbnail"
          :alt="image.altText"
          :class="[$style.image, { [$style.active]: index === activeSlide }]"
          :lazy="false"
          crossorigin
        />
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useCarousel from '~/composables/carousel'

export default defineComponent({
  props: {
    thumbs: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { activeSlide, goToSlideNumber } = useCarousel()
    return {
      activeSlide,
      goToSlideNumber,
    }
  },
})
</script>

<style lang="postcss" module>
.thumbs {
  @mixin list-reset;

  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(auto-fill, minmax(6em, 1fr));
}

.image {
  display: block;
  opacity: 0.5;
  transition: opacity var(--animation);

  &.active {
    opacity: 1;
  }
}
</style>
