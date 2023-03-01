<script setup lang="ts">
import { GetPageHome } from '~/graphql/Pages/Pages'
import { IPage } from '~~/interfaces/IPage'
import { IPostsBase } from '~~/interfaces/IPost'
const { data, pending } = await useAsyncQuery<{
  page: IPage
  posts: IPostsBase
}>(GetPageHome)

defineI18nRoute({
  paths: {
    nl: '/',
  },
})
</script>

<template>
  <app-loader v-if="pending" />

  <div v-else-if="data">
    <h1 class="sr-only">{{ data.page.title }}</h1>
    <latest-posts-section v-if="data" :posts="data.posts.edges" />
    <related-posters-section v-if="data" :posters="data.page.relatedPosters" />
    <!-- <app-stores-section /> -->
    <related-products-section :related-products="data.page.relatedProducts" />
  </div>
</template>
