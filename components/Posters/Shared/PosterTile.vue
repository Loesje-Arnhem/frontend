<template>
  <div
    v-if="poster.featuredImage"
    class="tile image-wrapper-tile"
    :data-slug="poster.slug"
  >
    <router-link :to="poster.uri" class="link">
      <featured-image
        :lazy="true"
        :alt="poster.title"
        :image="poster.featuredImage"
        :sizes="sizes"
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
    sizes: {
      type: String,
      default: 'sm:50vw md:33vw lg:25vw xl:250px',
    },
  },
})
</script>

<style lang="postcss" scoped>
.link {
  width: 100%;
  display: block;

  &:focus {
    outline-offset: 3px;
    outline-width: 1px;
  }
}
</style>
