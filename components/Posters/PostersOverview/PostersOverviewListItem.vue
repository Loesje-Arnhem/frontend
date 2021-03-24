<template>
  <li>
    <poster-tile :poster="poster.node" />
  </li>
</template>

<script>
import PosterTile from '~/components/Posters/Shared/PosterTile.vue'

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
