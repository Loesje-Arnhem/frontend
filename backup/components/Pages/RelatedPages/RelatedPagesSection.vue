<template>
  <section
    v-if="pages.edges.length"
    :class="$style['related-pages']"
    aria-labelledby="related-pages-title"
  >
    <h2 id="related-pages-title" class="sr-only">Overige pagina's</h2>
    <related-pages-list :pages="pages.edges" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IRelatedPages } from '~/interfaces/IPage'

export default defineComponent({
  props: {
    pages: {
      type: Object as PropType<IRelatedPages>,
      default: () => {},
    },
  },
})
</script>

<style lang="postcss" module>
.related-pages {
  @mixin block;
}
</style>
