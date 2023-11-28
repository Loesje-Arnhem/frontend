<script setup lang="ts">
import { GetPageByUri } from '~/graphql2/pages'

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

const { result, error } = await useQuery(GetPageByUri, {
  uri: uri.value,
})

if (result.value?.page === null || error.value) {
  throw createError({
    statusCode: 404,
    fatal: true,
  })
}

useMeta(result.value?.page)
</script>

<template>
  <div v-if="result?.page">
    <app-content
      :title="result.page.title"
      :content="result.page.content"
      :video="result.page?.videoGroup?.youtubeId"
    />
    <related-posters-section
      :posters="result.page.relatedPosters"
      :title="result.page.relatedPostersGroup?.title"
    />
    <related-pages-section :pages="result.page.relatedPages" />

    <related-products-section
      v-if="result?.page?.relatedProducts"
      :products="result.page.relatedProducts"
    />
  </div>
</template>
