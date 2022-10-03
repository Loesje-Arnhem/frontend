<template>
  <nuxt-picture
    :alt="alt"
    :loading="loading"
    :src="src"
    :preload="!lazy"
    :sizes="sizes"
    :width="width"
    :height="height"
    preset="base"
    class="image"
    format="avif"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
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
  max-width: 100%;
}
</style>
