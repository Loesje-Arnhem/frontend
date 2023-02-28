<script setup lang="ts">
import PageByByUri from '~/graphql/Pages/Pages'
import { IPage } from '~~/interfaces/IPage'
import { IPostsBase } from '~~/interfaces/IPost'

defineI18nRoute({
  paths: {
    nl: '/:pathMatch(.*)*',
  },
})

const route = useRoute()

const { data, pending } = await useAsyncQuery<{
  page: IPage
  posts: IPostsBase
}>(PageByByUri, {
  uri: route.fullPath,
})
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data">
    <app-content :title="data.page.title" :content="data.page.content" />
    <related-posters-section :posters="data.page.relatedPosters" />
    <related-products-section :related-products="data.page.relatedProducts" />
    <related-pages-section :pages="data.page.relatedPages" />
  </div>
</template>
