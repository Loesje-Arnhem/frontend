<template>
  <section
    :class="$style['related-pages']"
    aria-labelledby="related-pages-title"
  >
    <h2 id="related-pages-title" class="sr-only">Overige pagina's</h2>
    <related-pages-container :not-in="notIn" :parent-page-id="parentPageId">
      <template #default="data">
        <related-pages-list v-if="data" :pages="data.pages" />
      </template>
    </related-pages-container>
  </section>
</template>

<script>
import RelatedPagesContainer from '~/components/Pages/RelatedPages/RelatedPagesContainer.vue'
import RelatedPagesList from '~/components/Pages/RelatedPages/RelatedPagesList.vue'

export default {
  components: {
    RelatedPagesContainer,
    RelatedPagesList,
  },
  props: {
    notIn: {
      type: Number,
      default: 0,
    },
    parentPageId: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="postcss" module>
.related-pages {
  @mixin block;
  @mixin notch;
}
</style>
