<script setup lang="ts">
import PageByByUri from '~/graphql/Pages/Pages'
import { IPage } from '~~/interfaces/IPage'

defineI18nRoute({
  paths: {
    nl: '/:pathMatch(.*)*',
  },
})

const route = useRoute()

const uri = computed(() => {
  const slugs = route.path.split('/').filter((url) => url !== '')
  return slugs[slugs.length - 1]
})

const { data, pending, error } = await useAsyncQuery<{
  page: IPage | null
}>(PageByByUri, {
  uri: uri.value,
})

if (!data.value?.page) {
  throw createError({
    statusCode: 404,
    fatal: true,
  })
}

useMeta(data.value.page)
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data?.page">
    <app-content :title="data.page.title" :content="data.page.content" />
    <related-posters-section :posters="data.page.relatedPosters" />
    <related-products-section :related-products="data.page.relatedProducts" />
    <related-pages-section :pages="data.page.relatedPages" />
  </div>
</template>
