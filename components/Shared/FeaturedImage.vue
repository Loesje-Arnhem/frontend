<script lang="ts" setup>
import { FeaturedImageFragment } from '#gql'

const props = withDefaults(
  defineProps<{
    image: FeaturedImageFragment
    sizes: string
    lazy?: boolean
    alt?: string
  }>(),
  {
    lazy: true,
    alt: '',
  },
)

const altText = computed(() => {
  if (props.alt) {
    return props.alt
  } else if (props.image.node.alt) {
    return props.image.node.alt
  }
  return ''
})
</script>

<template>
  <img
    class="image"
    :alt="altText"
    :loading="lazy ? 'lazy' : null"
    :srcset="image.node.srcSet || undefined"
    :src="image.node.src || undefined"
    :sizes="sizes"
    :width="image.node.mediaDetails?.width || undefined"
    :height="image.node.mediaDetails?.height || undefined"
  />
</template>

<style lang="postcss" scoped>
.image {
  display: block;
  max-width: 100%;
}
</style>
