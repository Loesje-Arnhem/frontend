<template>
  <section :class="$style['child-pages']" aria-labelledby="child-pages-title">
    <h2 id="child-pages-title" class="sr-only">Overige pagina's</h2>
    <ul v-if="pages.edges.length" :class="$style.list">
      <child-page
        v-for="childPage in pages.edges"
        :key="childPage.node.id"
        :page="childPage"
        :class="$style['list-item']"
      />
    </ul>
  </section>
</template>

<script>
import ChildPage from '@/components/Pages/ChildPage.vue'

export default {
  components: {
    ChildPage
  },
  props: {
    pages: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="postcss" module>
.child-pages {
  @mixin block;
  @mixin notch;
}

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
