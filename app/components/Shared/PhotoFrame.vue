<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

defineProps<{
  image: FeaturedImage
}>()
</script>

<template>
  <div class="photo-wrapper">
    <app-image
      :lazy="false"
      v-bind="image"
      class="featured-image"
      sizes="80vw sm:280px"
    />

    <app-image
      src="/images/photoframe.png"
      :lazy="false"
      class="frame"
      :width="355"
      :height="456"
      sizes="100vw md:355px"
    />
  </div>
</template>

<style lang="css" scoped>
.photo-wrapper {
  position: relative;
  transform: rotate(2deg);
}

.frame {
  position: relative;
}

.featured-image:deep(img) {
  position: absolute;
  top: 11%;
  left: 17%;
  width: 68%;
  aspect-ratio: 24 / 36;
  object-fit: cover;
}
</style>
