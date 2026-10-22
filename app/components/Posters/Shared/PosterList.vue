<script lang="ts" setup>
import type { IPosterListItem } from '~/types/Content'

defineProps<{
  posters: IPosterListItem[]
}>()

const img = useImage()

const backgroundImage = computed(() =>
  img('/images/wall.png', {
    format: 'webp',
  }),
)
</script>

<template>
  <div
    class="wrapper"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <center-wrapper>
      <list-animation class="list">
        <li
          v-for="poster in posters"
          :key="poster.id"
          class="list-item"
        >
          <poster-tile :poster="poster" />
        </li>
      </list-animation>
    </center-wrapper>
  </div>
</template>

<style lang="css" scoped>
@import "~/assets/css/media-queries/media-queries.css";

.list {
  @mixin list-reset;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1em 0 3em;
  margin-block: -0.5em 1em;

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
}
</style>
