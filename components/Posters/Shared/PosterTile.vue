<template>
  <div
    v-if="poster.featuredImage"
    class="tile image-wrapper-tile"
    :data-slug="poster.slug"
  >
    <router-link :to="poster.uri" class="link">
      <img
        :alt="poster.title"
        :src="poster.featuredImage.node.medium"
        :srcset="`${poster.featuredImage.node.large} 2x`"
        class="poster"
        width="200"
        height="500"
        crossorigin
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedPoster } from '~/interfaces/IPoster'

export default defineComponent({
  props: {
    poster: {
      type: Object as PropType<IRelatedPoster>,
      default: () => {},
    },
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
