<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

defineProps<{
  images: FeaturedImage[]
}>()
</script>

<template>
  <ul v-if="images.length" class="thumbs">
    <li v-for="image in images" :key="`thumb-${image.id}`" class="tile">
      <featured-image
        :image="image"
        sizes="(max-width: 375px) 25vw, 200px"
        class="image"
      />
    </li>
  </ul>
</template>

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
