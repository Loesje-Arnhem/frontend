<template>
  <div class="photo-wrapper">
    <featured-image
      :lazy="false"
      :image="image"
      class="featured-image"
      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 600px, 450px"
    />

    <app-image
      src="/images/photoframe.png"
      :lazy="false"
      class="frame"
      :width="355"
      :height="456"
      sizes="sm:80vw lg:600px xxl:450px"
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
  max-width: var(--container-width-sm);
  margin: 0 auto 4em;
  transform: rotate(2deg);
}

.frame {
  position: relative;
}

.featured-image {
  position: absolute;
  display: block;
  top: 12%;
  left: 11%;
  width: 71%;
  aspect-ratio: 355 / 456;
  object-fit: cover;
}
</style>
