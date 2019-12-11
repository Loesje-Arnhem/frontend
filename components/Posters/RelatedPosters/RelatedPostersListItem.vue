<template>
  <li :class="$style['list-item']">
    <poster-tile :poster="poster.node" />
  </li>
</template>

<script>
import PosterTile from '@/components/Poster/PosterTile.vue'

export default {
  components: {
    PosterTile
  },
  props: {
    poster: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="postcss" module>
.list-item {
  padding: 0.5em;
  flex: 0 0 10em;
}
</style>
