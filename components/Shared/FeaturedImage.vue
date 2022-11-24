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
    crossorigin
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IFeaturedImage } from '~/interfaces/IMedia'

export default defineComponent({
  props: {
    image: {
      type: Object as PropType<IFeaturedImage>,
      required: true,
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    sizes: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="postcss" scoped>
.image {
  display: block;
  max-width: 100%;
}
</style>
