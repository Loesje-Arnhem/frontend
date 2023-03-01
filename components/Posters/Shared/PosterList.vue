<template>
  <div class="wrapper">
    <center-wrapper>
      <list-animation class="list">
        <li v-for="poster in posters" :key="poster.node.id" class="list-item">
          <poster-tile :poster="poster.node" />
        </li>
      </list-animation>
    </center-wrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    posters: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

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
