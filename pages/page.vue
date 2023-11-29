<script setup lang="ts">
import { GetPageByUri } from '~/graphql/pages'

defineI18nRoute({
  paths: {
    nl: '/[...slug]',
  },
})

const route = useRoute()

const uri = computed(() => {
  if (Array.isArray(route.params.slug)) {
    const slugs = route.params.slug.filter((slug) => slug !== '')
    return slugs.at(-1) ?? ''
  } else {
    return route.params.slug
  }
})

const { data } = await useAsyncQuery(GetPageByUri, {
  uri: uri.value,
})

useMeta(data.value.page)
</script>

<template>
  <div v-if="data.page">
    <app-content
      :title="data.page.title"
      :content="data.page.content"
      :video="data.page.videoGroup?.youtubeId"
    />
    <related-posters-section
      :posters="data.page.relatedPosters"
      :title="data.page.relatedPostersGroup?.title"
    />
    <related-pages-section :pages="data.page.relatedPages" />

    <related-products-section
      v-if="data.page?.relatedProducts"
      :products="data.page.relatedProducts"
    />
  </div>
</template>
