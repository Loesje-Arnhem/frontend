<template>
  <nuxt-picture
    :alt="alt"
    :loading="loading"
    :src="image.node.mediaItemUrl"
    :preload="!lazy"
    :sizes="sizes"
    :width="image.node.mediaDetails.width"
    :height="image.node.mediaDetails.height"
    preset="base"
    class="image"
    format="avif"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
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
  setup(props) {
    const loading = computed(() => {
      if (props.lazy) {
        return 'lazy'
      }
      return null
    })

    return {
      loading,
    }
  },
})
</script>

<style lang="postcss" scoped>
.image >>> img {
  display: block;
  width: 100%;
}
</style>
