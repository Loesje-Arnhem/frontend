<script lang="ts" setup>
import { type PostersFragment } from '~/types/__generated__/graphql'

defineProps<{
  posters: PostersFragment
}>()
</script>

<template>
  <div class="wrapper">
    <center-wrapper>
      <ul class="list">
        <li
          v-for="poster in posters.edges"
          :key="poster.node.id"
          class="list-item"
        >
          <poster-tile :poster="poster.node" />
        </li>
      </ul>
    </center-wrapper>
  </div>
</template>

<style lang="postcss" scoped>
@import '~/assets/css/media-queries/media-queries.css';

.wrapper {
  background: url('/images/wall.png');
}

.list {
  @mixin list-reset;

  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  padding: 1em 0 3em;
  margin-bottom: 1em;
  margin-top: -0.5em;

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
}
</style>
