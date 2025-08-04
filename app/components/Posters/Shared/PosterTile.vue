<script lang="ts" setup>
import type { IPosterListItem } from "~/types/Content";

const localePath = useLocalePath();

defineProps<{
  poster: IPosterListItem;
}>();
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

<style scoped>
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
