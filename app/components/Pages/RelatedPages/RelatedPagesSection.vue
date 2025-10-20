<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    parentId: number
    exclude: number
  }>(),
  {
    parentId: 0,
    exclude: 0,
  },
)

const { data } = useFetch('/api/pages/related-pages', {
  query: {
    parentId: props.parentId,
    exclude: props.exclude,
  },
})
</script>

<template>
  <section
    v-if="data?.length"
    :class="$style['related-pages']"
    aria-labelledby="related-pages-title"
  >
    <h2
      id="related-pages-title"
      class="sr-only"
    >
      Overige pagina's
    </h2>
    <related-pages-list :pages="data" />
  </section>
</template>

<style module>
.related-pages {
  @mixin block;
}
</style>
