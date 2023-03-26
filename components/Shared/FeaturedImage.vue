<script lang="ts" setup>
import { IFeaturedImage } from '~/interfaces/IContent'

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
