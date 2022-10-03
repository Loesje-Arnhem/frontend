<template>
  <app-image
    :alt="alt"
    :lazy="lazy"
    :src="image.node.mediaItemUrl"
    :sizes="sizes"
    :width="image.node.mediaDetails.width"
    :height="image.node.mediaDetails.height"
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
