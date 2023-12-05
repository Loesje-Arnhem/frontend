<script lang="ts" setup>
import type { MediaItemFragment } from '~/graphql/__generated__/graphql'

const props = withDefaults(
  defineProps<{
    image: MediaItemFragment
    sizes: string
    lazy?: boolean
    alt?: string | null
  }>(),
  {
    lazy: true,
    alt: '',
  },
)

const altText = computed(() => {
  if (props.alt) {
    return props.alt
  } else if (props.image.alt) {
    return props.image.alt
  }
  return ''
})
</script>

<template>
  <nuxt-picture
    class="image"
    :alt="altText"
    :loading="lazy ? 'lazy' : undefined"
    :srcset="image.srcSet || undefined"
    :src="image.src || undefined"
    :sizes="sizes"
    :width="image.mediaDetails?.width || undefined"
    :height="image.mediaDetails?.height || undefined"
  />
</template>

<style lang="postcss" scoped>
.image {
  display: block;
  max-width: 100%;
}
</style>
