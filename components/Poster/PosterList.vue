<template>
  <transition-group name="list" tag="ul" class="list">
    <li v-for="poster in posters" :key="poster.id" class="list-item">
      <poster-tile :poster="poster" class="link" />
    </li>
  </transition-group>
</template>

<script>
import PosterTile from '~/components/Poster/PosterTile.vue'

export default {
  components: {
    PosterTile,
  },
  props: {
    posters: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.list {
  @mixin list-reset;

  background: url('/images/backgrounds/wall.jpg');
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
}
</style>
