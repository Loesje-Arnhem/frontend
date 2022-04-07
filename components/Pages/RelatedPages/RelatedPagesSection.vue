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

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useRelatedPages } from '~/composables/usePage'

export default defineComponent({
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
    const { relatedPages, loading } = useRelatedPages(
      props.parentPageId,
      props.notIn,
    )

    return {
      relatedPages,
      loading,
    }
  },
})
</script>

<style lang="postcss" module>
.related-pages {
  @mixin block;
  @mixin notch;
}
</style>
