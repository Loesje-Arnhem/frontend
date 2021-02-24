<template>
  <ul :class="$style.thumbs">
    <li
      v-for="(image, index) in thumbs"
      :key="`thumb-${image.id}`"
      class="tile"
      :class="[$style.thumb, { [$style.active]: index === activeSlide }]"
      @click="goToSlideNumber(index)"
    >
      <app-image
        :src="image.thumbnail"
        :alt="image.altText"
        :class="$style.image"
      />
    </li>
  </ul>
</template>

<script>
import useCarousel from '~/compositions/carousel'

export default {
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
}
</script>

<style lang="postcss" module>
.thumbs {
  @mixin list-reset;

  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(3, 1fr);
}

.thumb {
  opacity: 0.5;
  transition: opacity var(--animation);

  &.active {
    opacity: 1;
  }
}

.image {
  display: block;
}
</style>
