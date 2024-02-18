<script lang="ts" setup>
import type { FeaturedImage } from '~/types/Content'

const props = withDefaults(
  defineProps<{
    image: FeaturedImage
    sizes: string
    lazy?: boolean
    alt?: string | null
  }>(),
  {
    lazy: true,
    alt: '',
  },
)
</script>

<template>
  <app-image
    class="image"
    :alt="alt || image.alt"
    :lazy="lazy"
    :src="image.src"
    :sizes="sizes"
    :width="image.width"
    :height="image.height"
  />
</template>

<style lang="postcss" scoped>
.image {
  display: block;
  max-width: 100%;
}
</style>
