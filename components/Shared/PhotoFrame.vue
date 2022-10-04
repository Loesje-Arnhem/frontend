<template>
  <div class="photo-wrapper">
    <featured-image
      :lazy="false"
      :image="image"
      class="featured-image"
      sizes="(max-width: 320px) 80vw, 280px"
    />

    <app-image
      src="/images/photoframe.png"
      :lazy="false"
      class="frame"
      :width="355"
      :height="456"
      sizes="xs:80vw sm:335px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IFeaturedImage } from '~/interfaces/IMedia'

export default defineComponent({
  props: {
    image: {
      type: Object as PropType<IFeaturedImage>,
      default: () => {},
    },
  },
})
</script>

<style lang="postcss" scoped>
.photo-wrapper {
  position: relative;
  max-width: 20em;
  width: 100%;
  margin: 0 auto 4em;
  transform: rotate(2deg);
}

.frame {
  position: relative;
}

.featured-image {
  position: absolute;
  top: 11%;
  left: 17%;
  width: 68%;
  aspect-ratio: 24 / 36;
  object-fit: cover;
}
</style>
