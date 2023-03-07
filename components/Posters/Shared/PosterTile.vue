<script lang="ts" setup>
import { IRelatedPoster } from '~/interfaces/IPoster'

withDefaults(
  defineProps<{
    poster: IRelatedPoster
    sizes?: string
  }>(),
  {
    sizes:
      '(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 250px',
  },
)
</script>

<template>
  <div class="tile-wrapper">
    <div
      v-if="poster.featuredImage"
      class="tile image-wrapper-tile"
      :data-slug="poster.slug"
    >
      <nuxt-link :to="poster.uri" class="link">
        <featured-image
          :lazy="true"
          :alt="poster.title"
          :image="poster.featuredImage"
          :sizes="sizes"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.link {
  width: 100%;
  display: block;
  padding: 2px;

  &:focus {
    outline-offset: 3px;
    outline-width: 1px;
  }
}

.tile-wrapper {
  background: var(--color-white);
}
</style>
