<template>
  <ul class="thumbs">
    <template v-for="(image, index) in thumbs">
      <li
        v-if="image"
        :key="`thumb-${image.node.id}`"
        class="tile"
        @click="goToSlideNumber(index)"
      >
        <featured-image
          :image="image"
          sizes="(max-width: 375px) 25vw, 200px"
          :alt="image.altText"
          class="image"
          :class="{ active: index === activeSlide }"
        />
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import useCarousel from '~/composables/carousel'
import { IFeaturedImage } from '~/interfaces/IMedia'

export default defineComponent({
  props: {
    thumbs: {
      type: Array as PropType<IFeaturedImage[]>,
      required: true,
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

<style lang="postcss" scoped>
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
  height: 100%;
  object-fit: cover;

  &.active {
    opacity: 1;
  }
}
</style>
