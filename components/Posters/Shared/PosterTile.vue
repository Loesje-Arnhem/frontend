<template>
  <div v-if="image" class="tile image-wrapper-tile" :data-slug="poster.slug">
    <router-link :to="poster.uri" class="link">
      <img
        :alt="poster.title"
        :src="image"
        class="poster"
        width="200"
        height="500"
        crossorigin
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedPoster } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    poster: {
      type: Object as PropType<IRelatedPoster>,
      default: () => {},
    },
  },
  setup(props) {
    const image = computed(() => {
      return props.poster.featuredImage?.node.medium
    })

    return {
      image,
    }
  },
})
</script>

<style lang="postcss" scoped>
.poster {
  display: block;
  width: 100%;
}

.link {
  width: 100%;
  display: block;

  &:focus {
    outline-offset: 3px;
    outline-width: 1px;
  }
}
</style>
