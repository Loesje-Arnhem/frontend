<script lang="ts" setup>
import type { IPosterListItem } from '~/types/Content'

const localePath = useLocalePath()

const props = defineProps<{
  poster: IPosterListItem
}>()

const transitionName = computed(() => `image-${props.poster.id}`)
</script>

<template>
  <div class="tile-wrapper">
    <div
      v-if="poster.featuredImage"
      class="tile image-wrapper-tile"
      :data-slug="poster.slug"
    >
      <nuxt-link
        :to="
          localePath({
            name: 'posters-details',
            params: { slug: poster.slug },
          })
        "
        class="link"
      >
        <app-image
          :lazy="true"
          v-bind="poster.featuredImage"
          sizes="50vw md:33vw lg:250px"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="css" scoped>
.link {
  display: block;
  inline-size: 100%;
  padding: 2px;

  &:focus {
    outline-width: 1px;
    outline-offset: 3px;
  }
}

.tile-wrapper {
  background: var(--color-white);
  view-transition-name: v-bind(transitionName);
}
</style>
