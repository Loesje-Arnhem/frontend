<template>
  <ul v-if="pages.length" :class="$style.list">
    <related-pages-list-item
      v-for="page in pages"
      :key="page.node.id"
      :page="page.node"
      :class="$style['list-item']"
    />
  </ul>
</template>

<script lang="ts">
import {  defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    pages: {
      type: Array,
      default: () => {},
    },
  },
})
</script>

<style lang="postcss" module>
.list {
  @mixin block;
  @mixin list-reset;
  @mixin center var(--container-width-lg);

  display: grid;
  grid-gap: 1rem;

  @media (--viewport-sm) {
    grid-template-columns: repeat(6, 1fr);
  }
}

.list-item {
  @media (--viewport-sm) {
    grid-column: span 5;

    &:nth-child(2n) {
      grid-column: 2 / span 5;
    }
  }

  @media (--viewport-lg) {
    margin-bottom: 2em;
    grid-column: span 4;

    &:nth-child(2n) {
      grid-column: 3 / span 4;
    }
  }
}
</style>
