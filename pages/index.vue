<script setup lang="ts">
import { GetPageHome } from '~/graphql/Pages/Pages'
import { IPage } from '~~/interfaces/IPage'
import { IPostsBase } from '~~/interfaces/IPost'
const { data } = await useAsyncQuery<{ page: IPage; posts: IPostsBase }>(
  GetPageHome,
)

defineI18nRoute({
  paths: {
    en: '/',
  },
})
</script>

<template>
  <div v-if="data">
    <h1 class="sr-only">{{ data.page.title }}</h1>
    <related-posters-section v-if="data" :posters="data.page.relatedPosters" />
    <latest-posts-section v-if="data" :posts="data.posts.edges" />
  </div>
</template>
