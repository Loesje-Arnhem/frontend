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
  <img
    class="image"
    :alt="alt || image.alt"
    :loading="lazy ? 'lazy' : undefined"
    :srcset="image.srcSet"
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
