<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

defineProps<{
  image: FeaturedImage
}>()
</script>

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
      sizes="xs:100vw md:355px"
    />
  </div>
</template>

<style lang="postcss" scoped>
.photo-wrapper {
  position: relative;
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
