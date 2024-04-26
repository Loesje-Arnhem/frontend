<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

defineProps<{
  images: FeaturedImage[]
}>()
</script>

<template>
  <div v-if="images.length" class="gallery">
    <image-carousel :images="images" />
  </div>
</template>

<style lang="postcss" scoped>
.main-image {
  margin-bottom: 0.5em;
}

.image {
  height: 100%;
  object-fit: cover;
}
</style>
