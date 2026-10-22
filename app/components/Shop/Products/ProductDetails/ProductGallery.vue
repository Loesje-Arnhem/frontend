<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

defineProps<{
  images: FeaturedImage[]
}>()
</script>

<template>
  <div
    v-if="images.length"
    class="gallery"
  >
    <image-carousel :images="images" />
  </div>
</template>

<style lang="css" scoped>
.main-image {
  margin-block-end: 0.5em;
}

.image {
  block-size: 100%;
  object-fit: cover;
}
</style>
