<script lang="ts" setup>
import { FeaturedImageFragment } from '#gql';

withDefaults(
  defineProps<{
    image: FeaturedImageFragment
    sizes: string
    lazy?: boolean
    alt?: string
  }>(),
  {
    lazy: true,
    alt: undefined
  },
)
</script>

<template>
  <img
    class="image"
    :alt="alt"
    :loading="lazy ? 'lazy' : null"
    :srcset="image.node.srcSet || undefined"
    :src="image.node.src || undefined"
    :sizes="sizes"
    :width="image.node.mediaDetails?.width || undefined"
    :height="image.node.mediaDetails?.height || undefined"
  >
</template>

<style lang="postcss" scoped>
.image {
  display: block;
  max-width: 100%;
}
</style>
