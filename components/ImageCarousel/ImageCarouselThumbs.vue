<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

defineEmits(['update-active-card-index'])

defineProps<{
  images: FeaturedImage[]
  activeItemIndex: number
}>()
</script>

<template>
  <ul v-if="images.length" class="thumbs">
    <li
      v-for="(image, index) in images"
      :key="`thumb-${image.src}`"
      class="tile"
      @click="$emit('update-active-card-index', index)"
    >
      <featured-image
        :image="image"
        :class="{ active: activeItemIndex === index }"
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
