<template>
  <section
    :class="$style['related-pages']"
    aria-labelledby="related-pages-title"
  >
    <h2 id="related-pages-title" class="sr-only">Overige pagina's</h2>
    <app-loader v-if="loading" />
    <related-pages-list v-else-if="relatedPages" :pages="relatedPages.edges" />
  </section>
</template>

<script>
import { useRelatedPages } from '~/composables/usePage'

export default {
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
  setup(props) {
    const { relatedPages, loading, error } = useRelatedPages(
      props.parentPageId,
      props.notIn,
    )

    return {
      relatedPages,
      loading,
      error,
    }
  },
}
</script>

<style lang="postcss" module>
.related-pages {
  @mixin block;
  @mixin notch;
}
</style>
