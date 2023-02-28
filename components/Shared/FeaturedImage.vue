<script lang="ts" setup>
import { IFeaturedImage } from '~/interfaces/IMedia'

withDefaults(
  defineProps<{
    image: IFeaturedImage
    sizes: string
    lazy?: boolean
    alt?: string
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
    :alt="alt"
    :loading="lazy ? 'lazy' : null"
    :srcset="image.node.srcSet"
    :src="image.node.src"
    :sizes="sizes"
    :width="image.node.mediaDetails.width"
    :height="image.node.mediaDetails.height"
  />
</template>

<style lang="postcss" scoped>
.image {
  display: block;
  max-width: 100%;
}
</style>
