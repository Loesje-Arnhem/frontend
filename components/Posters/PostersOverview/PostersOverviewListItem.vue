<template>
  <li>
    <poster-tile :poster="poster.node" />
  </li>
</template>

<script>
import PosterTile from '@/components/Poster/PosterTile.vue'

export default {
  components: {
    PosterTile,
  },
  props: {
    poster: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
