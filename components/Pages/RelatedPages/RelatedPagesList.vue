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

<script>
import RelatedPagesListItem from '@/components/Pages/RelatedPages/RelatedPagesListItem.vue'

export default {
  components: {
    RelatedPagesListItem,
  },
  props: {
    pages: {
      type: Array,
      default: () => {},
    },
  },
}
</script>

<style lang="postcss" module>
.list {
  @mixin block;
  @mixin list-reset;
  @mixin center var(--container-width-lg);

  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.list-item {
  margin-bottom: 2em;
  grid-column: span 2;

  &:nth-child(2n) {
    grid-column: 2 / span 2;
  }
}
</style>
