<script lang="ts" setup>
import { Endpoints } from '~~/enums/endpoints';

const props = defineProps<{
  parentId: number
}>()

const { data, pending } = await useAsyncData(
  'related-pages',
  () => $fetch(Endpoints.RelatedPages, {
    params: {
      parentId: props.parentId,
    }
  })
)
</script>

<template>
  <app-loader v-if="pending" />
  <section
    v-else-if="data?.length"
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

<style lang="postcss" module>
.related-pages {
  @mixin block;
}
</style>
